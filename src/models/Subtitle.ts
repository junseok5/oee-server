import { Schema } from "mongoose"

const Subtitle: Schema = new Schema({
    youtubeId: String,
    en: [
        {
            start: Number,
            end: Number,
            textContent: String
        }
    ]
    /* 유저들이 입력하는 내용들, 국가별로 따로 관리 해야함..
        그러면 데이터 내용이 ㅈㄴ 쌓일텐데 어떻게 관리할지 생각하자
    */
})
