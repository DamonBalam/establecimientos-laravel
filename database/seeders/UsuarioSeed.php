<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsuarioSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'admn',
            'email' => 'admn@admn.com',
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('12345678'),
            'remember_token' => NULL
        ]);

        DB::table('users')->insert([
            'name' => 'admin2',
            'email' => 'admin2@admn.com',
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('123456789'),
            'remember_token' => NULL
        ]);
    }
}
