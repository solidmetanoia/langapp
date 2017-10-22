<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::disableQueryLog();
        DB::beginTransaction();
		
    		// Test user.
    		DB::table('users')->insertGetID([
          'username' => 'test',
          'password' => Hash::make('test'),
          'email' => 'fake@email.com',
          'created_at' => DB::raw('NOW()'),
          'updated_at' => DB::raw('NOW()'),
        ]);              

        $this->call([
            BasicsSeed::class,
            // KanjiSeed::class,
            VocabularySeed::class,
        ]);

        DB::commit();
    }
}
