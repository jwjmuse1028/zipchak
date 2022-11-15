import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import '../css/Menu.css';
import {Avatar, Fab} from "@mui/material";
import {KeyboardArrowUp} from "@material-ui/icons";

function Menu(props) {
    const [prf_nick, setPrf_nick]=useState('');
    const [prf_img, setPrf_img]=useState('');
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })}
    useEffect(()=>{
        setPrf_nick(sessionStorage.prf_nick);
    },[]);
    useEffect(()=>{
        setPrf_img(sessionStorage.prf_img);
    },[]);

    return (
        <ul className='menu'>
            <li>
                <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
                <NavLink to={"/shop/list/1"}>중고</NavLink>

            </li>
            <li>
                <NavLink to={"/chat/"}>채팅</NavLink>
            </li>
            {/*<li>*/}
            {/*    <NavLink to={"/board/list"}>게시판</NavLink>*/}
            {/*</li>*/}
            <li>
                <NavLink to={"/feed/list"}>피드목록</NavLink>
            </li>
            <li>
                <NavLink to={"/feed/insertform"}>피드글쓰기</NavLink>
            </li>
            {/*{*/}
            {/*    localStorage.loginok==null?*/}
            {/*        <li>*/}
            {/*            <NavLink to={"/login"}>로그인</NavLink>*/}
            {/*        </li>:*/}
            {/*        <div>*/}
            {/*            &nbsp;&nbsp;&nbsp;*/}
            {/*            <b>{myname}님</b>&nbsp;&nbsp;*/}
            {/*            <button type='button' className='btn btn-outline-primary'*/}
            {/*                    onClick={(e)=>{*/}
            {/*                        localStorage.removeItem("loginok");*/}
            {/*                        localStorage.removeItem("myid");*/}
            {/*                        localStorage.removeItem("myname");*/}
            {/*                        window.location.reload(); //새로고침*/}
            <li>
                <NavLink to={"/feed/detail"}>피드상세페이지</NavLink>
            </li>

            {
                sessionStorage.loginok==null?
                    <div>
                        <li>
                            <NavLink to={'/register'}>회원가입</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/login"}>로그인</NavLink>
                        </li>
                    </div>
                    :
                    <div style={{float:"right"}}>
                        <Avatar src={prf_img}/>&nbsp;&nbsp;
                        <b>{prf_nick}님이 로그인중</b>&nbsp;&nbsp;&nbsp;
                        <button type={"button"} className={'w-btn w-btn-indigo'}
                                onClick={(e)=>{
                                    sessionStorage.removeItem("loginok");
                                    sessionStorage.removeItem("ur_id");
                                    sessionStorage.removeItem("prf_nick");
                                    sessionStorage.removeItem("prf_img");
                                    sessionStorage.removeItem("ur_num");
                                    window.location.reload();
                                }}>로그아웃</button>
                    </div>
            }
            <div className="scroll__container">
                <Fab id="top" onClick={scrollToTop} color={"info"}><KeyboardArrowUp/></Fab>
            </div>
        </ul>
    );
}

export default Menu;