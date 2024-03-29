import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import PostModal from './PostModal'
import {getArticlesApi} from '../actions'
import ReactPlayer from 'react-player'

const Main = (props) => {
    const [showModal, setShowModal] = useState("close")

    useEffect(() =>{
        props.getArticles()
    }, [])

    const handleClick = (e) => {
        e.preventDefault()

        if(e.target != e.currentTarget){
            return;
        }

        switch(showModal){
            case "open": 
                setShowModal("close")
                break;
            case "close": 
                setShowModal("open")
                break;
            default:
                setShowModal("close")
                break
        }
    }
    return(
        <>
        <Container>
            <ShareBox>       
                
                <div>
                    { props.user && props.user.photoURL ? 
                        <img src={props.user.photoURL}></img> : 
                        <img src="/images/user.svg"></img>
                    }
                    <button onClick={handleClick}
                    disabled={props.loading ? true: false}
                    >Start a Post</button>
                </div>

                    <div>
                    <button>
                        <img src="/images/photo-icon.svg"/>
                        <span>Photo</span>
                    </button>
                
                    <button>
                        <img src="/images/photo-icon.svg"/>
                        <span>Video</span>
                    </button>

                    <button>
                        <img src="/images/event-icon.svg"/>
                        <span>Event</span>
                    </button>
                
                    <button>
                        <img src="/images/photo-icon.svg"/>
                        <span>Write Article</span>
                    </button>
                </div>
            </ShareBox>
            { 
            props.articles.length === 0 ?
            <p>There are no articles</p> :
            <Content>
                { 
                    props.loading && <img src='/images/spinning.svg'/>
                }
                {
                    props.articles.length > 0 &&
                    props.articles.map((article, key) => (            
                <Article key={key}>
                    <SharedActor>
                        <a>
                            <img src={article.actor.image}></img>
                            <div>
                                <span>{article.actor.title}</span>
                                <span>{article.actor.description}</span>
                                <span>{article.actor.date.toDate().toLocaleDateString()}</span>
                            </div>
                        </a>
                        <button>
                            <img src="/images/ellipsis.svg"/>
                        </button>
                    </SharedActor>
                    <Description>{article.description}</Description>
                    <SharedImg>
                        <a>
                            {
                                !article.sharedImg && article.video ? 
                                <ReactPlayer width={'100%'} url={article.video}></ReactPlayer> :
                                (article.sharedImg && <img src={article.sharedImg}></img>)
                            }
                        </a>
                    </SharedImg>
                    <SocialCounts>
                        <li>
                            <button>
                                <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"></img>
                                <img src="/images/celebrate.svg"/>
                                <span>75</span>
                            </button>
                        </li>
                        <li>
                            <a>
                                {article.comments}
                            </a>
                        </li>
                    </SocialCounts>
                    
                    <SocialActions>
                        <button>
                            <img src="/images/like-icon.svg"/>
                            <span>Like</span>
                        </button>
                        <button>
                            <img src="/images/comment-icon.svg"/>
                            <span>Comment</span>
                        </button>
                        <button>
                            <img src="/images/share-icon.svg"></img>
                            <span>Share</span>
                        </button>
                        <button>
                            <img src="/images/send-icon.svg"></img>
                            <span>Send</span>
                        </button>
                    </SocialActions>
                    
                </Article>  
                    ))}
            </Content>
}
            <PostModal showModal={showModal} handleClick={handleClick}/>
        </Container>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        loading: state.articleState.loading,
        articles: state.articleState.articles,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getArticles: () => dispatch(getArticlesApi())
})


export default connect(mapStateToProps, mapDispatchToProps)(Main)

const Container = styled.div`
    grid-area: main;
`
const CommonCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 /20%);
`
const ShareBox = styled(CommonCard)`
    display: flex;
    flex-direction: column;
    color: #958b7b;
    margin: 0 0 8px;
    background: white;

    div{
        button{
            outline: none;
            color: rgba(0,0,0, 0.6);
            font-size: 14px;
            line-height: 1.5;
            min-height: 48px;
            background: transparent;
            border: none;
            display: flex;
            align-items: center;
            font-weight: 600;
        }

        &:first-child{
            display: flex;
            align-items: center;
            padding: 8px 16px 0 16px;

            img{
                width: 48px;
                border-radius: 50%;
                margin-right: 8px;
            }
            button{
                margin: 4px 0;
                flex-grow: 1;
                border-radius: 35px;
                padding-left: 16px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                background-color: white;
                text-align: left;
            }
        }

        &:nth-child(2){
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding-bottom: 4px;
        
            button{
                img{
                    margin: 0 4px 0 -2px;
                }
                span{
                    color: #70b5f9;
                }
            }
        }
    }
`
const Article = styled(CommonCard)`
    padding: 0;
    margin: 0 0;
    overflow: visible;
`
const SharedActor = styled.div`
    padding-right: 40px;
    flex-wrap: nowrap;
    padding: 12px 16px 0;
    margin-bottom: 8px;
    align-items: center;
    display: flex;

    a{
        margin-right: 12px;
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        text-decoration: none;

        img{
            width: 48px;
            height: 48px;
            border-radius: 50%;
        }

        & > div {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-basis: 0;
            margin-left: 8px;
            overflow: hidden;

            span{
                text-align: left;
                &:first-child{
                    font-size: 14px;
                    font-weight: 700;
                    color: rgba(0, 0, 0, 1)
                }

                &:nth-child(n+1){
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.6);
                }
            }
        }
    }
    button{
        position: absolute;
        right: 12px;
        top: 0;
        background: transparent;
        border: none;
        outline: none;
        width: 35px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 3px;

        :hover{
            cursor: pointer;
            background-color: lightgrey;
            border-radius: 12px;
        }
    }
`
const Description = styled.div`
    padding: 0 16px;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.9);
    font-size: 14px;
    text-align: left;
`
const SharedImg = styled.div`
    margin-top: 8px;
    width: 100%;
    display: block;
    position: relative;
    background-color: #f9fafb;

    img{
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
`
const SocialCounts = styled.ul`
    line-height: 1.3;
    display: flex;
    align-items: flex-start;
    overflow: auto;
    margin: 0 16px;
    padding: 8px 0;
    border-bottom: 1px solid #e9e5df;
    list-style: none;

    li{
        margin-right: 5px;
        font-size: 12px;
        button{
            display: flex;
            border: none;
            /* background-color: transparent; */
            border-radius: 12px;
            img{
                height: 22px;
            }
            span{
                padding-top: 5px;
                padding-left: 5px;
            }
        }
        a{
            display: flex;
            align-items: center;
            padding-top: 5px;
        }
    }
`
const SocialActions = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-start;
    margin: 0;
    min-height: 40px;
    padding: 4px 8px;
    button{
        display: inline-flex;
        align-items: center;
        padding: 8px;
        color: #0a66c2;
        background: none;
        border: none;

        :hover{
            background: lightgrey;
            cursor: pointer;
            border-radius: 12px;
        }

        @media (min-width: 768px) {
            span{
                margin-left: 8px;
            }
        }
        img{
            height: 30px;
        }
    }
`
const Content = styled.div`
    text-align: center;
    & > img{
        width: 30px;
    }
`