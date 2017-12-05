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

    information = (
      <div className='d-flex h4 pm0 justify-content-around'>
        { type != 'kanji'
          ? <div className='' dangerouslySetInnerHTML={{__html: data.example_en}} />
          : ( <div className='d-flex flex-grow-1'>
                <div className='flex-grow-1'>
                  {data.onyomi != '' && <div className='flex-grow-1'>onyomi: {data.onyomi}</div> }
                </div>
                <div className='flex-grow-1'>
                  {data.kunyomi != '' &&  <div className='flex-grow-1'>kunyomi: {data.kunyomi}</div> }
                </div>
              </div> )
        }
      </div>
    );

    if(data.example_ja != null){
      example = <div className='h3 p-2 flex-grow-1' dangerouslySetInnerHTML={{__html: data.example_ja}} />;
    }

    return (
      <div className='flex-center flex-column flex-1 align-items-center'>
        <div className='d-flex flex-grow-3'>
          <div className={((answered == null) ? 'display-1' : 'display-2')+' flex-grow-3 d-flex align-items-center'}>
            {data.word || "Word missing"}
          </div>
        </div>
        <div className="flex-column flex-grow-1 w-100">
          {example}
          {answered != null && information}
        </div>
      </div>
    )
  }
}
