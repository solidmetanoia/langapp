<?php

use Illuminate\Database\Seeder;

class BasicsSeed extends Seeder
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

        // id, letter_ja, letter_en, sound...
        $basic_cards = [
          [  'letter_ja' => 'あ', 'letter_en' => 'a', 'sound' => 'a.mp3' ], [  'letter_ja' => 'い', 'letter_en' => 'i', 'sound' => 'i.mp3' ], [  'letter_ja' => 'う', 'letter_en' => 'u', 'sound' => 'u.mp3' ], [  'letter_ja' => 'え', 'letter_en' => 'e', 'sound' => 'e.mp3' ], [  'letter_ja' => 'お', 'letter_en' => 'o', 'sound' => 'o.mp3' ], 
          [  'letter_ja' => 'か', 'letter_en' => 'ka', 'sound' => 'ka.mp3' ], [  'letter_ja' => 'き', 'letter_en' => 'ki', 'sound' => 'ki.mp3' ], [  'letter_ja' => 'く', 'letter_en' => 'ku', 'sound' => 'ku.mp3' ], [  'letter_ja' => 'け', 'letter_en' => 'ke', 'sound' => 'ke.mp3' ], [  'letter_ja' => 'こ', 'letter_en' => 'ko', 'sound' => 'ko.mp3' ], 
          [  'letter_ja' => 'さ', 'letter_en' => 'sa', 'sound' => 'sa.mp3' ], [  'letter_ja' => 'し', 'letter_en' => 'shi', 'sound' => 'shi.mp3' ], [  'letter_ja' => 'す', 'letter_en' => 'su', 'sound' => 'su.mp3' ], [  'letter_ja' => 'せ', 'letter_en' => 'se', 'sound' => 'se.mp3' ], [  'letter_ja' => 'そ', 'letter_en' => 'so', 'sound' => 'so.mp3' ], 
          [  'letter_ja' => 'た', 'letter_en' => 'ta', 'sound' => 'ta.mp3' ], [  'letter_ja' => 'ち', 'letter_en' => 'chi', 'sound' => 'chi.mp3' ], [  'letter_ja' => 'つ', 'letter_en' => 'tsu', 'sound' => 'tsu.mp3' ], [  'letter_ja' => 'て', 'letter_en' => 'te', 'sound' => 'te.mp3' ], [  'letter_ja' => 'と', 'letter_en' => 'to', 'sound' => 'to.mp3' ], 
          [  'letter_ja' => 'な', 'letter_en' => 'na', 'sound' => 'na.mp3' ], [  'letter_ja' => 'に', 'letter_en' => 'ni', 'sound' => 'ni.mp3' ], [  'letter_ja' => 'ぬ', 'letter_en' => 'nu', 'sound' => 'nu.mp3' ], [  'letter_ja' => 'ね', 'letter_en' => 'ne', 'sound' => 'ne.mp3' ], [  'letter_ja' => 'の', 'letter_en' => 'no', 'sound' => 'no.mp3' ], 
          [  'letter_ja' => 'は', 'letter_en' => 'ha', 'sound' => 'ha.mp3' ], [  'letter_ja' => 'ひ', 'letter_en' => 'hi', 'sound' => 'hi.mp3' ], [  'letter_ja' => 'ふ', 'letter_en' => 'hu', 'sound' => 'hu.mp3' ], [  'letter_ja' => 'へ', 'letter_en' => 'he', 'sound' => 'he.mp3' ], [  'letter_ja' => 'ほ', 'letter_en' => 'ho', 'sound' => 'ho.mp3' ], 
          [  'letter_ja' => 'ま', 'letter_en' => 'ma', 'sound' => 'ma.mp3' ], [  'letter_ja' => 'み', 'letter_en' => 'mi', 'sound' => 'mi.mp3' ], [  'letter_ja' => 'む', 'letter_en' => 'mu', 'sound' => 'mu.mp3' ], [  'letter_ja' => 'め', 'letter_en' => 'me', 'sound' => 'me.mp3' ], [  'letter_ja' => 'も', 'letter_en' => 'mo', 'sound' => 'mo.mp3' ], 
          [  'letter_ja' => 'ら', 'letter_en' => 'ra', 'sound' => 'ra.mp3' ], [  'letter_ja' => 'り', 'letter_en' => 'ri', 'sound' => 'ri.mp3' ], [  'letter_ja' => 'る', 'letter_en' => 'ru', 'sound' => 'ru.mp3' ], [  'letter_ja' => 'れ', 'letter_en' => 're', 'sound' => 're.mp3' ], [  'letter_ja' => 'ろ', 'letter_en' => 'ro', 'sound' => 'ro.mp3' ], 
          [  'letter_ja' => 'や', 'letter_en' => 'ya', 'sound' => 'ya.mp3' ], [  'letter_ja' => 'ゆ', 'letter_en' => 'yu', 'sound' => 'yu.mp3' ], [  'letter_ja' => 'よ', 'letter_en' => 'yo', 'sound' => 'yo.mp3' ], 
          [  'letter_ja' => 'わ', 'letter_en' => 'wa', 'sound' => 'wa.mp3' ], [  'letter_ja' => 'を', 'letter_en' => 'wo', 'sound' => 'o.mp3' ], [  'letter_ja' => 'ん', 'letter_en' => 'n', 'sound' => 'n.mp3' ], 
          [  'letter_ja' => 'が', 'letter_en' => 'ga', 'sound' => 'ga.mp3' ], [  'letter_ja' => 'ぎ', 'letter_en' => 'gi', 'sound' => 'gi.mp3' ], [  'letter_ja' => 'ぐ', 'letter_en' => 'gu', 'sound' => 'gu.mp3' ], [  'letter_ja' => 'げ', 'letter_en' => 'ge', 'sound' => 'ge.mp3' ], [  'letter_ja' => 'ご', 'letter_en' => 'go', 'sound' => 'go.mp3' ], 
          [  'letter_ja' => 'ざ', 'letter_en' => 'za', 'sound' => 'za.mp3' ], [  'letter_ja' => 'じ', 'letter_en' => 'ji', 'sound' => 'ji.mp3' ], [  'letter_ja' => 'ず', 'letter_en' => 'zu', 'sound' => 'zu.mp3' ], [  'letter_ja' => 'ぜ', 'letter_en' => 'ze', 'sound' => 'ze.mp3' ], [  'letter_ja' => 'ぞ', 'letter_en' => 'zo', 'sound' => 'zo.mp3' ], 
          [  'letter_ja' => 'だ', 'letter_en' => 'da', 'sound' => 'da.mp3' ], [  'letter_ja' => 'ぢ', 'letter_en' => 'dzi', 'sound' => 'dzi.mp3' ], [  'letter_ja' => 'づ', 'letter_en' => 'dzu', 'sound' => 'dzu.mp3' ], [  'letter_ja' => 'で', 'letter_en' => 'de', 'sound' => 'de.mp3' ], [  'letter_ja' => 'ど', 'letter_en' => 'do', 'sound' => 'do.mp3' ], 
          [  'letter_ja' => 'ば', 'letter_en' => 'ba', 'sound' => 'ba.mp3' ], [  'letter_ja' => 'び', 'letter_en' => 'bi', 'sound' => 'bi.mp3' ], [  'letter_ja' => 'ぶ', 'letter_en' => 'bu', 'sound' => 'bu.mp3' ], [  'letter_ja' => 'べ', 'letter_en' => 'be', 'sound' => 'be.mp3' ], [  'letter_ja' => 'ぼ', 'letter_en' => 'bo', 'sound' => 'bo.mp3' ], 
          [  'letter_ja' => 'ぱ', 'letter_en' => 'pa', 'sound' => 'pa.mp3' ], [  'letter_ja' => 'ぴ', 'letter_en' => 'pi', 'sound' => 'pi.mp3' ], [  'letter_ja' => 'ぷ', 'letter_en' => 'pu', 'sound' => 'pu.mp3' ], [  'letter_ja' => 'ぺ', 'letter_en' => 'pe', 'sound' => 'pe.mp3' ], [  'letter_ja' => 'ぽ', 'letter_en' => 'po', 'sound' => 'po.mp3' ], 
          [  'letter_ja' => 'ア', 'letter_en' => 'a', 'sound' => 'a.mp3' ], [  'letter_ja' => 'イ', 'letter_en' => 'i', 'sound' => 'i.mp3' ], [  'letter_ja' => 'ウ', 'letter_en' => 'u', 'sound' => 'u.mp3' ], [  'letter_ja' => 'エ', 'letter_en' => 'e', 'sound' => 'e.mp3' ], [  'letter_ja' => 'オ', 'letter_en' => 'o', 'sound' => 'o.mp3' ], 
          [  'letter_ja' => 'カ', 'letter_en' => 'ka', 'sound' => 'ka.mp3' ], [  'letter_ja' => 'キ', 'letter_en' => 'ki', 'sound' => 'ki.mp3' ], [  'letter_ja' => 'ク', 'letter_en' => 'ku', 'sound' => 'ku.mp3' ], [  'letter_ja' => 'ケ', 'letter_en' => 'ke', 'sound' => 'ke.mp3' ], [  'letter_ja' => 'コ', 'letter_en' => 'ko', 'sound' => 'ko.mp3' ], 
          [  'letter_ja' => 'サ', 'letter_en' => 'sa', 'sound' => 'sa.mp3' ], [  'letter_ja' => 'シ', 'letter_en' => 'shi', 'sound' => 'shi.mp3' ], [  'letter_ja' => 'ス', 'letter_en' => 'su', 'sound' => 'su.mp3' ], [  'letter_ja' => 'セ', 'letter_en' => 'se', 'sound' => 'se.mp3' ], [  'letter_ja' => 'ソ', 'letter_en' => 'so', 'sound' => 'so.mp3' ], 
          [  'letter_ja' => 'タ', 'letter_en' => 'ta', 'sound' => 'ta.mp3' ], [  'letter_ja' => 'チ', 'letter_en' => 'chi', 'sound' => 'chi.mp3' ], [  'letter_ja' => 'ツ', 'letter_en' => 'tsu', 'sound' => 'tsu.mp3' ], [  'letter_ja' => 'テ', 'letter_en' => 'te', 'sound' => 'te.mp3' ], [  'letter_ja' => 'ト', 'letter_en' => 'to', 'sound' => 'to.mp3' ], 
          [  'letter_ja' => 'ナ', 'letter_en' => 'na', 'sound' => 'na.mp3' ], [  'letter_ja' => 'ニ', 'letter_en' => 'ni', 'sound' => 'ni.mp3' ], [  'letter_ja' => 'ヌ', 'letter_en' => 'nu', 'sound' => 'nu.mp3' ], [  'letter_ja' => 'ネ', 'letter_en' => 'ne', 'sound' => 'ne.mp3' ], [  'letter_ja' => 'ノ', 'letter_en' => 'no', 'sound' => 'no.mp3' ], 
          [  'letter_ja' => 'ハ', 'letter_en' => 'ha', 'sound' => 'ha.mp3' ], [  'letter_ja' => 'ヒ', 'letter_en' => 'hi', 'sound' => 'hi.mp3' ], [  'letter_ja' => 'フ', 'letter_en' => 'hu', 'sound' => 'hu.mp3' ], [  'letter_ja' => 'ヘ', 'letter_en' => 'he', 'sound' => 'he.mp3' ], [  'letter_ja' => 'ホ', 'letter_en' => 'ho', 'sound' => 'ho.mp3' ], 
          [  'letter_ja' => 'マ', 'letter_en' => 'ma', 'sound' => 'ma.mp3' ], [  'letter_ja' => 'ミ', 'letter_en' => 'mi', 'sound' => 'mi.mp3' ], [  'letter_ja' => 'ム', 'letter_en' => 'mu', 'sound' => 'mu.mp3' ], [  'letter_ja' => 'メ', 'letter_en' => 'me', 'sound' => 'me.mp3' ], [  'letter_ja' => 'モ', 'letter_en' => 'mo', 'sound' => 'mo.mp3' ], 
          [  'letter_ja' => 'ラ', 'letter_en' => 'ra', 'sound' => 'ra.mp3' ], [  'letter_ja' => 'リ', 'letter_en' => 'ri', 'sound' => 'ri.mp3' ], [  'letter_ja' => 'ル', 'letter_en' => 'ru', 'sound' => 'ru.mp3' ], [  'letter_ja' => 'レ', 'letter_en' => 're', 'sound' => 're.mp3' ], [  'letter_ja' => 'ロ', 'letter_en' => 'ro', 'sound' => 'ro.mp3' ], 
          [  'letter_ja' => 'ヤ', 'letter_en' => 'ya', 'sound' => 'ya.mp3' ], [  'letter_ja' => 'ユ', 'letter_en' => 'yu', 'sound' => 'yu.mp3' ], [  'letter_ja' => 'ヨ', 'letter_en' => 'yo', 'sound' => 'yo.mp3' ], 
          [  'letter_ja' => 'ワ', 'letter_en' => 'wa', 'sound' => 'wa.mp3' ], [  'letter_ja' => 'ヲ', 'letter_en' => 'wo', 'sound' => 'o.mp3' ], [  'letter_ja' => 'ン', 'letter_en' => 'n', 'sound' => 'n.mp3' ], 
          [  'letter_ja' => 'ガ', 'letter_en' => 'ga', 'sound' => 'ga.mp3' ], [  'letter_ja' => 'ギ', 'letter_en' => 'gi', 'sound' => 'gi.mp3' ], [  'letter_ja' => 'グ', 'letter_en' => 'gu', 'sound' => 'gu.mp3' ], [  'letter_ja' => 'ゲ', 'letter_en' => 'ge', 'sound' => 'ge.mp3' ], [  'letter_ja' => 'ゴ', 'letter_en' => 'go', 'sound' => 'go.mp3' ], 
          [  'letter_ja' => 'ザ', 'letter_en' => 'za', 'sound' => 'za.mp3' ], [  'letter_ja' => 'ジ', 'letter_en' => 'ji', 'sound' => 'ji.mp3' ], [  'letter_ja' => 'ズ', 'letter_en' => 'zu', 'sound' => 'zu.mp3' ], [  'letter_ja' => 'ゼ', 'letter_en' => 'ze', 'sound' => 'ze.mp3' ], [  'letter_ja' => 'ゾ', 'letter_en' => 'zo', 'sound' => 'zo.mp3' ], 
          [  'letter_ja' => 'ダ', 'letter_en' => 'da', 'sound' => 'da.mp3' ], [  'letter_ja' => 'ヂ', 'letter_en' => 'dzi', 'sound' => 'dzi.mp3' ], [  'letter_ja' => 'ヅ', 'letter_en' => 'dzu', 'sound' => 'dzu.mp3' ], [  'letter_ja' => 'デ', 'letter_en' => 'de', 'sound' => 'de.mp3' ], [  'letter_ja' => 'ド', 'letter_en' => 'do', 'sound' => 'do.mp3' ], 
          [  'letter_ja' => 'バ', 'letter_en' => 'ba', 'sound' => 'ba.mp3' ], [  'letter_ja' => 'ビ', 'letter_en' => 'bi', 'sound' => 'bi.mp3' ], [  'letter_ja' => 'ブ', 'letter_en' => 'bu', 'sound' => 'bu.mp3' ], [  'letter_ja' => 'ベ', 'letter_en' => 'be', 'sound' => 'be.mp3' ], [  'letter_ja' => 'ボ', 'letter_en' => 'bo', 'sound' => 'bo.mp3' ], 
          [  'letter_ja' => 'パ', 'letter_en' => 'pa', 'sound' => 'pa.mp3' ], [  'letter_ja' => 'ピ', 'letter_en' => 'pi', 'sound' => 'pi.mp3' ], [  'letter_ja' => 'プ', 'letter_en' => 'pu', 'sound' => 'pu.mp3' ], [  'letter_ja' => 'ペ', 'letter_en' => 'pe', 'sound' => 'pe.mp3' ], [  'letter_ja' => 'ポ', 'letter_en' => 'po', 'sound' => 'po.mp3' ], 
        ];
        DB::table('basics_list')->insert($basic_cards);

        DB::commit();
    }
}
