<?php

use Illuminate\Support\Facades\Route;

use Inertia\Inertia;




Route::get('/customers', fn () => Inertia::render('frontend/src/features/customers/pages/customer'))
    ->name('customers');

Route::get('/categories', fn () => Inertia::render('frontend/src/features/categories/pages/categories'))
    ->name('/categories');

Route::get('/suppliers', fn () => Inertia::render('frontend/src/features/suppliers/pages/supplier'))
    ->name('/suppliers');

Route::get('/brands', fn () => Inertia::render('frontend/src/features/brands/pages/brand'))
    ->name('/brands');

    
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

