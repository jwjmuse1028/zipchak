import React, {useState} from 'react';
import "../css/FeedForm.css";
import noimg from './noimage.jpg';
import {Editor} from "@toast-ui/react-editor";
import '@toast-ui/editor/dist/toastui-editor.css'
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import axios from "axios";

function FeedInsertForm(props) {

     const [img,setImg]=useState(noimg);
    // const [fname,setFname]=useState('');
    // const [fhp,setFhp]=useState('');
    // const [bookingday,setBookingday]=useState('');
    // const navi=useNavigate();
    //
    // //content는 Ref로(입력할때마다 다시 랜더링되는거 방지위해)
    // const contentRef=useRef('');

    const url=localStorage.url;

    //파일 업로드 이벤트
    const onUploadChange=(e)=>{

        // const uploadFile=e.target.files[0];
        // const imageFile=new FormData();
        // imageFile.append("uploadFile",uploadFile);
        //
        // let uploadUrl=url+"/food/upload";
        // console.log(uploadUrl);
        //
        // axios({
        //     method:'post',
        //     url:uploadUrl,
        //     data:imageFile,
        //     headers:{'Content-Type':'multipart/form-data'}
        // }).then(res=>{
        //     setFoodPhoto(res.data); //res.data에 업로드된 사진이름이 배열형태로 리턴
        // });

    }
    const photoChange=(e)=>{


    }
    //사진이 없을 경우 이벤트
    const onErrorImg=(e)=>{
        e.target.src=noimg;
    }
    return (
        <div className={"form_container"}>
            <h3>피드 게시글 입력 폼</h3><br/>
            
            {/* 제목입력 */}
            <input type={'text'} className={"form-control"}
                   style={{height: '60px', fontSize: '25px'}}
                   placeholder={'제목을 입력하세요.'}/>
            {/* 셀렉트 */}
            <div className={'form_box'}>
                <div className="form_row">
                    <div className="form_row_title">주거형태<span style={{color:'rgb(255, 119, 119)'}}>*</span>
                    </div>
                    <div style={{width: '220px', marginRight:'80px'}}>
                        <select name="metadata.workType" className="form-select">
                            <option value="" selected disabled></option>
                            <option value="0">홈스타일링</option>
                            <option value="1">리모델링</option>
                            <option value="2">부분시공</option>
                            <option value="3">건축</option>
                        </select>
                    </div>
                    <div className="form_row_title">평수<span style={{color:'rgb(255, 119, 119)'}}>*</span>
                    </div>
                    <div style={{width: '130px'}}>
                        <input type={'text'} className={"form-control"}/>
                    </div>
                </div>
                <div className="form_row">
                    <div className="form_row_title">가족형태<span style={{color:'rgb(255, 119, 119)'}}>*</span></div>
                    <div style={{width: '220px',display: 'block', marginRight:'80px'}}>
                        {/* 필수 입력항목 입력 안했을 시 에러 */}
                        <select name="metadata.family.type" className="form-select empty error">
                            <option value="" selected disabled></option>
                            <option value="0">싱글라이프</option>
                            <option value="1">신혼/부부가 사는집</option>
                            <option value="2">자녀가 있는 집</option>
                            <option value="3">부모님과 함께 사는 집</option>
                            <option value="4">룸메이트와 함께 사는 집</option>
                            <option value="5">기타</option>
                        </select>
                        <div className="form_empty_msg">필수 입력 항목입니다.</div>
                    </div>
                    <div className="form_row_title">반려동물<span style={{color:'rgb(255, 119, 119)'}}>*</span>
                    </div>
                    <div style={{width: '130px'}}>
                        <select name="metadata.workType" className="form-select">
                            <option value="" selected disabled></option>
                            <option value="없음">없음</option>
                            <option value="강아지">강아지</option>
                            <option value="고양이">고양이</option>
                            <option value="어류">어류</option>
                            <option value="조류">조류</option>
                            <option value="파충류">파충류</option>
                            <option value="파충류">진아</option>
                            <option value="기타">기타</option>
                        </select>
                    </div>
                </div>
                <div className="form_row">
                    <div className="form_row_title">스타일<span style={{color:'rgb(255, 119, 119)'}}>*</span>
                    </div>
                    <div style={{width: '220px'}}>
                        <select name="metadata.workType" className="form-select">
                            <option value="" selected disabled></option>
                            <option value="없음">모던</option>
                            <option value="강아지">미니멀&심플</option>
                            <option value="고양이">내추럴</option>
                            <option value="북유럽">북유럽</option>
                            <option value="빈티지&레트로">빈티지&레트로</option>
                            <option value="클래식&앤틱">클래식&앤틱</option>
                            <option value="러블리&로맨틱">러블리&로맨틱</option>
                            <option value="한국&아시아">한국&아시아</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* 사진 선택 */}
            <div className={'form_img_box'} style={{backgroundImage: `url(${img})`}}>
                <input type={'file'} id="fileimg" multiple
                       style={{visibility: 'hidden'}} onChange={photoChange}/>
                <div className={'css-fvirbu'}>
                    <p className="css-1idkie2">
                        <span className="css-1wclmit">추가하기 버튼으로<br/></span>
                        커버 사진을 업로드해주세요.
                    </p>
                    <button className="css-fj1jqk" onClick={()=>{
                        document.getElementById("fileimg").click();
                    }}>커버 사진 추가하기</button>
                </div>
            </div>


            <Editor
                previewStyle="vertical" // 미리보기 스타일 지정
                height="500px" // 에디터 창 높이
                initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
                plugins={[colorSyntax]}
                hideModeSwitch={true}
                toolbarItems={[
                    // 툴바 옵션 설정
                    ['heading', 'bold', 'italic', 'strike'],
                    ['hr', 'quote'],
                    ['ul', 'ol', 'task', 'indent', 'outdent'],
                    ['table', 'image', 'link'],
                ]}
                hooks={{
                    addImageBlobHook:async (blob,callback)=>{

                        console.log(blob)

                        console.log(blob.name)

                        const formData=new FormData()
                        formData.append('file',blob)

                        let url=localStorage.url+"/image/insert"

                        axios.post(url,formData,{
                            header: { "content-type": "multipart/formdata" }
                        })
                            .then(res=>{
                                    alert("이미지 업로드 성공"+res.data)

                                }
                            )

                        callback(url)
                    }
                }}
            />

        </div>
    );
}

export default FeedInsertForm;