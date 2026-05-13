<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    public function run(): void
    {
        $packages = [
            [
                'title' => 'Silver',
                'price' => '25,000',
                'is_featured' => false,
                'sort_order' => 1,
                'features' => ['1 Photographer', '200+ Edited Photos', 'Traditional Photography', 'Same Day Highlights', 'Online Gallery', 'Basic Retouching'],
            ],
            [
                'title' => 'Gold',
                'price' => '55,000',
                'is_featured' => true,
                'sort_order' => 2,
                'features' => ['2 Photographers', '500+ Edited Photos', 'Candid + Traditional', 'Cinematic Highlight Film', 'Online Gallery + USB', 'Premium Retouching', 'Pre-Wedding Shoot', 'Drone Coverage'],
            ],
            [
                'title' => 'Platinum',
                'price' => '1,00,000',
                'is_featured' => false,
                'sort_order' => 3,
                'features' => ['3+ Photographers', '1000+ Edited Photos', 'Full Cinematic Film', 'All Events Coverage', 'Drone Aerial Shots', 'Pre-Wedding Shoot', 'Premium Photo Album', 'Same Day Edit', 'Online Gallery + USB', 'Dedicated Editor'],
            ],
        ];

        foreach ($packages as $pkg) {
            Package::updateOrCreate(['title' => $pkg['title']], $pkg);
        }
    }
}
