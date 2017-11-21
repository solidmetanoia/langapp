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
        foreach (range(1, 5) as $level) {
            Schema::create("n{$level}_vocabulary_list", function (Blueprint $table) use ($level) {
                $table->increments('id');
                $table->string('word');
                $table->string('meaning');
                $table->string('reading');
            });

            Schema::create("n{$level}_kanji_list", function (Blueprint $table) use ($level) {
                $table->increments('id');
                $table->string('word');
                $table->string('kunyomi');
                $table->string('onyomi');
                $table->string('meaning');
            });

            Schema::create("study_progress_n{$level}_vocabulary", function (Blueprint $table) use ($level) {
                $table->integer('user_id')->unsigned();
                $table->integer('item_id')->unsigned();
                $table->decimal('study_rate');
                $table->integer('streak')->default(0);
                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                $table->foreign('item_id')->references('id')->on("n{$level}_vocabulary_list");
                $table->timestamp('created_at')->useCurrent();
                $table->timestamp('updated_at')->nullable();
                $table->primary(['user_id', 'item_id']);
            });

            Schema::create("study_progress_n{$level}_kanji", function (Blueprint $table) use ($level) {
                $table->integer('user_id')->unsigned();
                $table->integer('item_id')->unsigned();
                $table->decimal('study_rate');
                $table->integer('streak')->default(0);
                $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
                $table->foreign('item_id')->references('id')->on("n{$level}_kanji_list");
                $table->timestamp('created_at')->useCurrent();
                $table->timestamp('updated_at')->nullable();
                $table->primary(['user_id', 'item_id']);
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        foreach (range(1, 5) as $level) {
            Schema::table("study_progress_n{$level}_vocabulary", function(Blueprint $table) use ($level) {
              $table->dropForeign("study_progress_n{$level}_vocabulary_user_id_foreign");
              $table->dropForeign("study_progress_n{$level}_vocabulary_item_id_foreign");
            });
            Schema::table("study_progress_n{$level}_kanji", function(Blueprint $table) use ($level) {
              $table->dropForeign("study_progress_n{$level}_kanji_user_id_foreign");
              $table->dropForeign("study_progress_n{$level}_kanji_item_id_foreign");
            });
            Schema::dropIfExists("study_progress_n{$level}_vocabulary");
            Schema::dropIfExists("study_progress_n{$level}_kanji");
            Schema::dropIfExists("n{$level}_kanji_list");
            Schema::dropIfExists("n{$level}_vocabulary_list");
        }
    }
}
