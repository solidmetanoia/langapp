// WordDisplay.js

import React, {Component} from 'react';

export default class WordDisplay extends Component {

  constructor() {
    super();
  }

  render(){
    let postAnswer, information, example = null;
    let data = this.props.data.word;
    let answered = this.props.data.answered;
    let type = this.props.data.type;
    let required = this.props.data.required;

    information = (
      <div className='d-flex h3 pm0 justify-content-around'>
        { type != 'kanji'
          ? <div className='' dangerouslySetInnerHTML={{__html: data.example_en}} />
          : ( <div className='d-flex flex-grow-1'>
                {data.onyomi != '' && <KanjiDetails data={data.onyomi} title="onyomi"/> }
                  {/* <div className='flex-grow-1'>onyomi: {data.onyomi}</div> */}
                {data.kunyomi != '' &&  <KanjiDetails data={data.kunyomi} title="kunyomi"/> }
                {/* <div className='flex-grow-1'>kunyomi: {data.kunyomi}</div> } */}
              </div> )
        }
      </div>
    );

    if(data.example_ja != null){
      example = <div className='h3 p-2 flex-grow-1' dangerouslySetInnerHTML={{__html: data.example_ja}} />;
    }

    postAnswer = (
      <div className='h2 pm0'>
        {required == 'reading'
          ? <div className='h2 p-2' dangerouslySetInnerHTML={{__html: data.meaning}} />
          : data.reading}
      </div>
    );

    return (
      <div className='flex-center flex-column flex-1 align-items-center'>
        <div className='d-flex flex-grow-2'>
          <div className='display-1 flex-grow-3 d-flex align-items-center'>
            {data.word || "Word missing"}
          </div>
        </div>
        {answered != null && postAnswer}
        <div className="flex-column flex-grow-1 w-100">
          {example}
          {answered != null && information}
        </div>
      </div>
    )
  }
}

const KanjiDetails = (props) => {
  const details = props.data.split(" ").map((word, index) => {
    return <span key={index} className='kanji-details rounded pm2'>{word}</span>
    // return [
    //   word,
    //   index !== props.data.length - 1 && (
    //     <View key={index} {...props} style={styles.separator} />
    //   )
    // ];
  });
  return (
    <div className='flex-grow-1 flex-column flex-center'>
      {props.title}
      <div className='m-1'>
        {details}
      </div>
    </div>
  )
}
