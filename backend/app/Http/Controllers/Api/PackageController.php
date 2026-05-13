<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\Request;

class PackageController extends Controller
{
    public function index()
    {
        return response()->json(Package::orderBy('sort_order')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|string',
            'features' => 'required|array',
            'is_featured' => 'boolean',
        ]);

        $package = Package::create($request->only(['title', 'price', 'features', 'is_featured', 'sort_order']));
        return response()->json($package, 201);
    }

    public function update(Request $request, Package $package)
    {
        $package->update($request->only(['title', 'price', 'features', 'is_featured', 'sort_order']));
        return response()->json($package);
    }

    public function destroy(Package $package)
    {
        $package->delete();
        return response()->json(['message' => 'Package deleted']);
    }
}
