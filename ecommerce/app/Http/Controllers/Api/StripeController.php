<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;

use App\Models\Order;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Stripe\Webhook;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Log;



class StripeController extends Controller
{
    public function createSession($orderId)
    {
        $order = Order::with('items.product')
            ->where('user_id', auth()->id())
            ->findOrFail($orderId);

        Stripe::setApiKey(env('STRIPE_SECRET'));

        $lineItems = [];

        foreach ($order->items as $item) {
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $item->product->name,
                    ],
                    'unit_amount' => $item->price * 100,
                ],
                'quantity' => $item->quantity,
            ];
        }

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => $lineItems,
            'mode' => 'payment',

            // redirect
            'success_url' => env('FRONTEND_URL') . '/success?order_id=' . $order->id,
            'cancel_url' => env('FRONTEND_URL') . '/cart',
        ]);

        $order->update([
            'stripe_session_id' => $session->id
        ]);

        return response()->json([
            'url' => $session->url
        ]);
    }




    public function webhook(Request $request)
    {
        $endpointSecret = env('STRIPE_WEBHOOK_SECRET');

        $payload = $request->getContent();
        $sigHeader = $request->header('Stripe-Signature');

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sigHeader,
                $endpointSecret
            );
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        if ($event->type === 'checkout.session.completed') {

            $session = $event->data->object;

            $order = Order::with('items.product')
                ->where('stripe_session_id', $session->id)
                ->first();

            if ($order && $order->status !== 'paid') {

                foreach ($order->items as $item) {

                    $product = $item->product;

                    // 🔥 stock check (safety)
                    if ($product->stock >= $item->quantity) {
                        $product->decrement('stock', $item->quantity);
                    }
                }

                $order->update([
                    'status' => 'paid'
                ]);

                // 🧹 clear cart
                CartItem::where('user_id', $order->user_id)->delete();
            }
        }

        return response()->json(['success' => true]);
    }
}
