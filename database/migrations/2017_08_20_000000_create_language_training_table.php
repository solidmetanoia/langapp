<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLanguageTrainingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // hiragana_katakana_list (id, symbol, reading (, AUDIO PROUNCIATION?));
        // core_list (id, item, meaning, reading, example (, AUDIO PROUNCIATION ITEM, AUDIO PROUNCIATION EXAMPLE?));

        Schema::create('basics_list', function (Blueprint $table) {
            $table->increments('id');
            $table->string('letter_ja');
            $table->string('letter_en');
            $table->string('sound');
        });

        Schema::create('core_list', function (Blueprint $table) {
            $table->increments('id');
            $table->string('word');
            $table->string('meaning');
            $table->string('type');
            $table->string('reading');
            $table->text('example_ja');
            $table->string('example_en');
            $table->string('reading_sound');
            $table->string('example_sound');
        });

        Schema::create('study_progress_basic', function (Blueprint $table) {
            $table->integer('user_id')->unsigned();
            $table->integer('item_id')->unsigned();
            $table->decimal('study_rate');
            $table->integer('streak')->default(0);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('item_id')->references('id')->on('basics_list');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable();
            // $table->timestamps()->useCurrent();
            $table->primary(['user_id', 'item_id']);
        });

        Schema::create('study_progress_core', function (Blueprint $table) {
            $table->integer('user_id')->unsigned();
            $table->integer('item_id')->unsigned();
            $table->decimal('study_rate');
            $table->integer('streak')->default(0);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('item_id')->references('id')->on('core_list');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable();
            // $table->timestamps()->useCurrent();
            $table->primary(['user_id', 'item_id']);
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('study_progress_core', function(Blueprint $table){
          $table->dropForeign('study_progress_core_user_id_foreign');
          $table->dropForeign('study_progress_core_item_id_foreign');
        });
        Schema::table('study_progress_basic', function(Blueprint $table){
          $table->dropForeign('study_progress_basic_user_id_foreign');
          $table->dropForeign('study_progress_basic_item_id_foreign');
        });
        Schema::dropIfExists('study_progress_basic');
        Schema::dropIfExists('study_progress_core');
        Schema::dropIfExists('basics_list');
        Schema::dropIfExists('core_list');

    }
}
