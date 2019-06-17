import React,{Component} from 'react'
//import WordCloud from 'react-d3-cloud';
import { TagCloud } from 'react-tagcloud';
import style from './style.css'
import {Tooltip} from 'antd';
import PureRenderMixin from 'react-addons-pure-render-mixin'

const svgData = [
  {
    img: '/svg/cat.svg',
    name: 'github',
    tooltip: 'https://github.com/nitrohe/react-blog',
    link:'https://github.com/nitrohe/react-blog',
    svg:(
        <svg version="1.1" id="Capa_1"  x="0px" y="0px" width="35px" height="35px" viewBox="0 0 438.549 438.549">
            <g >
                <path d="M409.132,114.573c-19.608-33.596-46.205-60.194-79.798-79.8C295.736,15.166,259.057,5.365,219.271,5.365
                    c-39.781,0-76.472,9.804-110.063,29.408c-33.596,19.605-60.192,46.204-79.8,79.8C9.803,148.168,0,184.854,0,224.63
                    c0,47.78,13.94,90.745,41.827,128.906c27.884,38.164,63.906,64.572,108.063,79.227c5.14,0.954,8.945,0.283,11.419-1.996
                    c2.475-2.282,3.711-5.14,3.711-8.562c0-0.571-0.049-5.708-0.144-15.417c-0.098-9.709-0.144-18.179-0.144-25.406l-6.567,1.136
                    c-4.187,0.767-9.469,1.092-15.846,1c-6.374-0.089-12.991-0.757-19.842-1.999c-6.854-1.231-13.229-4.086-19.13-8.559
                    c-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559
                    c-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-0.951-2.568-2.098-3.711-3.429c-1.142-1.331-1.997-2.663-2.568-3.997
                    c-0.572-1.335-0.098-2.43,1.427-3.289c1.525-0.859,4.281-1.276,8.28-1.276l5.708,0.853c3.807,0.763,8.516,3.042,14.133,6.851
                    c5.614,3.806,10.229,8.754,13.846,14.842c4.38,7.806,9.657,13.754,15.846,17.847c6.184,4.093,12.419,6.136,18.699,6.136
                    c6.28,0,11.704-0.476,16.274-1.423c4.565-0.952,8.848-2.383,12.847-4.285c1.713-12.758,6.377-22.559,13.988-29.41
                    c-10.848-1.14-20.601-2.857-29.264-5.14c-8.658-2.286-17.605-5.996-26.835-11.14c-9.235-5.137-16.896-11.516-22.985-19.126
                    c-6.09-7.614-11.088-17.61-14.987-29.979c-3.901-12.374-5.852-26.648-5.852-42.826c0-23.035,7.52-42.637,22.557-58.817
                    c-7.044-17.318-6.379-36.732,1.997-58.24c5.52-1.715,13.706-0.428,24.554,3.853c10.85,4.283,18.794,7.952,23.84,10.994
                    c5.046,3.041,9.089,5.618,12.135,7.708c17.705-4.947,35.976-7.421,54.818-7.421s37.117,2.474,54.823,7.421l10.849-6.849
                    c7.419-4.57,16.18-8.758,26.262-12.565c10.088-3.805,17.802-4.853,23.134-3.138c8.562,21.509,9.325,40.922,2.279,58.24
                    c15.036,16.18,22.559,35.787,22.559,58.817c0,16.178-1.958,30.497-5.853,42.966c-3.9,12.471-8.941,22.457-15.125,29.979
                    c-6.191,7.521-13.901,13.85-23.131,18.986c-9.232,5.14-18.182,8.85-26.84,11.136c-8.662,2.286-18.415,4.004-29.263,5.146
                    c9.894,8.562,14.842,22.077,14.842,40.539v60.237c0,3.422,1.19,6.279,3.572,8.562c2.379,2.279,6.136,2.95,11.276,1.995
                    c44.163-14.653,80.185-41.062,108.068-79.226c27.88-38.161,41.825-81.126,41.825-128.906
                    C438.536,184.851,428.728,148.168,409.132,114.573z"/>
            </g>
        </svg>
    )
  },
  {
      img: '/svg/outlook.svg',
      name: 'mail',
      tooltip: 'nitrohe@163.com',
      link:'#',
      svg: (
        <svg version="1.1" id="Capa_1"  x="0px" y="0px" width="35px" height="35px" viewBox="0 0 512 512" >
             <g>
             	<g>
             		<path d="M282.208,19.67c-3.648-3.008-8.48-4.256-13.152-3.392l-256,48C5.472,65.686,0,72.278,0,79.99v352
             			c0,7.68,5.472,14.304,13.056,15.712l256,48c0.96,0.192,1.984,0.288,2.944,0.288c3.68,0,7.328-1.28,10.208-3.68
             			c3.68-3.04,5.792-7.584,5.792-12.32v-448C288,27.222,285.888,22.71,282.208,19.67z M256,460.694L32,418.71V93.27l224-41.984
             			V460.694z"/>
             	</g>
             </g>
             <g>
             	<g>
             		<path d="M144,175.99c-44.096,0-80,43.072-80,96s35.904,96,80,96s80-43.072,80-96S188.096,175.99,144,175.99z M144,335.99
             			c-26.464,0-48-28.704-48-64c0-35.296,21.536-64,48-64s48,28.704,48,64S170.464,335.99,144,335.99z"/>
             	</g>
             </g>
             <g>
             	<g>
             		<path d="M496,111.99H272c-8.832,0-16,7.168-16,16s7.168,16,16,16h208v224H272c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h224
             			c8.832,0,16-7.168,16-16v-256C512,119.158,504.832,111.99,496,111.99z"/>
             	</g>
             </g>
             <g>
             	<g>
             		<path d="M508.608,118.134c-5.472-6.976-15.52-8.256-22.432-2.784L351.04,220.438l-70.464-44.832
             			c-7.392-4.704-17.312-2.528-22.08,4.928c-4.736,7.456-2.528,17.344,4.896,22.08l80,50.88c2.624,1.664,5.632,2.496,8.608,2.496
             			c3.456,0,6.944-1.12,9.792-3.392l144-112C512.8,135.158,514.048,125.11,508.608,118.134z"/>
             	</g>
             </g>

        </svg>
    )
  }
];



export default class ProfileIntro extends Component{
    constructor(props){
        super(props);

        this.state = {
            loginMenuShow:'none',
            modalVisible: false

        }
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    onHandleClickSvg(item) {
        console.log("click svg-",item);
    }


    render(){
        let _this = this;
        let visible = this.state.loginMenuShow;

        let articleTotal = this.props.websiteInfo.articleTotal;
        let commentTotal = this.props.websiteInfo.commentTotal;
        let visitTotal = this.props.websiteInfo.visitTotal;


        const svgIcon = svgData.map((item,index) => (
            <Tooltip key={index} placement="bottom" title={item.tooltip}>
                <a key={index} onClick={this.onHandleClickSvg.bind(this,item.name)}>{item.svg}</a>
            </Tooltip>
        ));

        return(

            <div className={style.profileIntroBox}>
                <div >
                    <div className={style.mainRtitle}>
                        <h4><span><em></em>个人资料</span></h4>
                    </div>
                    <div className={style.profileIntroContent}>

                        {/*<div className={style.profileIntroUserInfo}>
                            <img src='/favicon.png' />
                            <span>nitrohe</span>

                        </div>*/}

                        <div className={style.profileIntroMotto}>
                            {/*<span>前期追深度，否则会华而不实，后期追广度，否则会坐井观天；</span>*/}
                            <span>如果两次都还没成功，那就叫2.0版吧</span>
                        </div>

                        <div className={style.profileIntroContact}>
                            {/*<a><img src='/svg/cat.svg' alt="icon" /></a>
                            <a><img src='/svg/outlook.svg' alt="icon" /></a>*/}
                            {svgIcon}
                            {/*<Icon type="gitlab"  style={{ fontSize: 26}}/>*/}
                        </div>

                        <div className={style.profileIntroBlogInfo}>
                            <div >
                                <span>原创</span>
                                <span>{articleTotal}</span>
                            </div>
                            <div >
                                <span>评论</span>
                                <span>{commentTotal}</span>
                            </div>
                            <div >
                                <span>访问</span>
                                <span>{visitTotal}</span>
                            </div>
                        </div>



                    </div>

                </div>

            </div>




        )
    }

}
