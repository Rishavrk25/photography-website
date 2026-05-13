<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            ['client_name' => 'Priya & Rahul Sharma', 'review' => 'Shubham and his team made our wedding day truly magical! The photos and videos captured every emotion perfectly.', 'rating' => 5],
            ['client_name' => 'Ananya & Vikram Singh', 'review' => 'The pre-wedding shoot was incredible! They found the most stunning locations and made us feel so comfortable.', 'rating' => 5],
            ['client_name' => 'Sneha & Amit Kumar', 'review' => 'Our cinematic wedding film brings tears to our eyes every time we watch it. Truly masterful storytelling.', 'rating' => 5],
            ['client_name' => 'Kavita & Rajan Verma', 'review' => 'Professional, creative, and incredibly talented! Worth every penny and more!', 'rating' => 5],
            ['client_name' => 'Meera & Saurav Das', 'review' => 'From Haldi to Vidaai, they covered everything beautifully. The drone shots are amazing!', 'rating' => 5],
        ];

        foreach ($testimonials as $t) {
            Testimonial::updateOrCreate(['client_name' => $t['client_name']], $t);
        }
    }
}
