<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class NLevels extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('n3_vocab_list', function (Blueprint $table) {
            $table->increments('id');
            $table->string('word');
            $table->string('meaning');
            $table->string('reading')->nullable();
        });

        Schema::create('n3_kanji_list', function (Blueprint $table) {
            $table->increments('id');
            $table->string('word');
            $table->string('kunyomi');
            $table->string('onyomi');
            $table->string('meaning');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('n3_kanji_list');
        Schema::dropIfExists('n3_vocab_list');
    }
}
