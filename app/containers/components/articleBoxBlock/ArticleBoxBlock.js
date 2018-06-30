import React,{Component} from 'react'
import style from './style.css'

export default class ArticleBoxBlock extends Component{
    constructor(props){
        super(props);
    }

    render(){
        let _this = this;


        let articleList = this.props.data.map((item,index)=>(
            <li className={`${style.moTextOverflow} ${style.listGroupItem}`} key={index} onClick={()=>{props.history.push(`/detail/${item._id}`, {id:item._id});props.getArticleDetail(item._id)}}>
                <a className={style.animate}>{item.title}</a>
            </li>
        ))


        return(


            <div className={style.articleBox}>
                <div >
                    <div className={style.mainRtitle}>
                        <h4><span><em></em>文章推荐</span></h4>
                    </div>
                    <ul className={style.hotArticleList}>
                        {articleList}
                    </ul>
                </div>
            </div>



        )
    }

}
