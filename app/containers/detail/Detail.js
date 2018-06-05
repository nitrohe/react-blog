import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import remark from 'remark'
import {connect} from 'react-redux'
import {actions} from "../../reducers/frontReducer";
const {get_article_detail} = actions;
import reactRenderer from 'remark-react'
import { Anchor } from 'antd';
import style from './style.css'
import DocumentTitle from 'react-document-title';

class Detail extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render(){
        const {articleContent,title,author,viewCount,commentCount,time} = this.props;
        const articleParse = remark().use(reactRenderer).processSync(articleContent).contents;
        const { Link } = Anchor;
        const articleAnchor = articleParse[1].map((item,index)=>(
            <Link key={index} href={`#${item.h2}`} title={item.h2} />
        ));
        let webTitle = "Nitrohe's Blog";
        
        return(
            <DocumentTitle title={`${webTitle} | 文章`}>
                <div className={`${style.container} ${style.contentContainer}`}>
                    <div className={style.contentMain}>
                        <h2>{title}</h2>
                        <div className={style.articleInfo}>
                            <span >
                                <img className={style.authorImg} src={require('./author.png')}/> {author}
                            </span>
                            <span>
                                <img src={require('./calendar.png')}/> {time}
                            </span>
                            <span>
                                <img src={require('./comments.png')}/> {commentCount}
                            </span>
                            <span>
                                <img src={require('./views.png')}/> {viewCount}
                            </span>
                        </div>
                        <div id='preview' className={style.content}>
                            {articleParse[0]}
                        </div>
                    </div>
                    <div className={style.contentright}>
                        <Anchor offsetTop={30}>
                            {articleAnchor}
                        </Anchor>
                    </div>
                </div>
            </DocumentTitle>
        )
    }
    componentWillReceiveProps(nextProps) {
        //console.log("detail=",nextProps);
        //if(nextProps.articleContent)
        //    console.log('processSync=',remark().use(reactRenderer).processSync(nextProps.articleContent).contents);
    }
    componentDidMount() {
        if(typeof this.props.location.state != "undefined"){
            this.props.get_article_detail(this.props.location.state.id);
        } else {
            this.props.get_article_detail(this.props.location.pathname.split('/')[2]);
        }

    }
}

function mapStateToProps(state) {
    const {content,title,author,viewCount,commentCount,time} = state.front.articleDetail;
    return{
        articleContent:content,
        title,
        author,
        viewCount,
        commentCount,
        time
    }
}

function mapDispatchToProps(dispatch) {
    return{
        get_article_detail:bindActionCreators(get_article_detail,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);
