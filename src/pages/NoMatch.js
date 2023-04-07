import { useNavigate } from "react-router-dom"

const NoMatch = () => {
    const navigate = useNavigate()
    return <div>
        여긴 아무것도 없네요 ㅠㅠ
        <button onClick={()=>navigate("/")}>Home으로 돌아가기</button>
    </div>
}

export default NoMatch