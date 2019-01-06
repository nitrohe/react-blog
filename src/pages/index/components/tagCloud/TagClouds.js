import React,{Component} from 'react'
//import WordCloud from 'react-d3-cloud';
import { TagCloud } from 'react-tagcloud';
import style from './style.css'
import PureRenderMixin from 'react-addons-pure-render-mixin'

export default class TagClouds extends Component{
    constructor(props){
        super(props);

        this.state = {
            loginMenuShow:'none',
            modalVisible: false

        }
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }


    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
             this.setState({ loading: false, visible: false });
        }, 3000);
    }

    render(){
        let _this = this;
        let visible = this.state.loginMenuShow;

        const data = [
          { text: 'React', value: 100, rotate:0 },
          { text: 'nodejs', value: 100, rotate:30  },
          { text: 'makedown', value: 20, rotate:330  },
          { text: 'redux', value: 100, rotate:30  },
          { text: 'html5', value: 50, rotate:300  },
          { text: 'saga', value: 100, rotate:30  },
          { text: 'css3', value: 50, rotate:330  },
          { text: 'mongoose', value: 20, rotate:30  },
          { text: 'linux', value: 100, rotate:60  },
          { text: 'blog', value: 50, rotate:330  },
          { text: 'php', value: 100, rotate:60  },
          { text: 'Spider', value: 50, rotate:330  }
        ];
        const dataTag = [

            { value: "React", count: 25 },
            { value: "Nodejs", count: 20 },
            { value: "Express", count: 20 },
            { value: "HTML5", count: 25 },
            { value: "MongoDB", count: 20 },
            { value: "CSS3", count: 20 },
            { value: "linux", count: 20 },
            { value: "php", count: 25 },
            { value: "Vue", count: 25 },
            { value: "Spider", count: 20 }
        ];

        const fontSizeMapper = word => Math.log2(word.value) * 4;
        const rotate = word => word.rotate;

        return(

            <div className={style.tagCloudBox}>
                <div >
                    <div className={style.mainRtitle}>
                        <h4><span><em></em>标签云</span></h4>
                    </div>
                    <div className={style.tagCloudBoxContent}>
                        <TagCloud minSize={20}
                            maxSize={30}
                            tags={dataTag}
                            onClick={tag => console.log(`'${tag.value}' was selected!`)} />

                    </div>

                </div>

                {/*
                    <div >
                        <div className={style.mainRtitle}>
                            <h4><span><em></em>标签云</span></h4>
                        </div>
                        <div className={style.tagCloudBoxContent}>
                            <WordCloud
                               data={data}
                               fontSizeMapper={fontSizeMapper}
                               rotate={rotate}
                               width="290"
                               height="200"
                             />
                        </div>

                    </div>
                */}
            </div>




        )
    }


}
