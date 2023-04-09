# :notebook_with_decorative_cover: TO DO LIST!
<span style="font-size : 18px">**개인 미니 프로젝트(pre-onboarding)**</span>

<br>
<br>
<br>

>## 프로젝트 실행방법
<br>

1.`git clone` <br><br>
2.프로젝트 디렉토리 이동  <br><br>
3.터미널 열기 <br><br>
4.npm install <br><br>
5.npm start <br><br>

로 바로 테스트 가능합니다.
<br>
또는 <span style="font-size : 20px">**배포**가 완료된 상태이니 아래 링크로 접속하시면 바로 테스트 가능합니다</span>

## **:point_right: [TO DO LIST](https://to-do-list-wonted.web.app/)**

<br><br>


> ## 사용 기술

<br>

Basic
- React
- npm
- Create React App

Library
- React-router-dom 
- Axios

Publish
- firebase

> ## 구현 기능

<br>

### 1. 페이지 

<br>
Create React App으로 만들었지만 각 기능별 페이지를 분할시킬 필요가 있었습니다.
따라서 React-router-dom 라이브러리를 이용 각 페이지를 Router로 연결시켰습니다.

- 첫 Router 연결 시 동작 오류가 있었습니다.   :mag: [코드확인](https://github.com/hoinlee-moi/wanted-pre-onboarding-frontend/blob/main/src/Router.js#L1)<br>
    - 해당 불량은 라우터 inport시 올바른 경로의 라우터를 가져오지 않아서 생긴 문제였습니다.
    - Router import 경로를 올바르게 변경한 뒤 정상 동작 하였습니다.
    - 하지만 해당 불량을 버전으로 찾다가 새로운 6.10버전이 출시된 걸 확인 새롭게 적용해봤습니다.<br>
    - children 속성을 이용하여 중첩 라우팅을 할 수 있다는 면에서 새롭게 다가왔지만 현 프로젝트에선 사용해보지 못했습니다.

<details>
<summary style="cursor : pointer;">코드 펼치기</summary> 

```javascript
const Router = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Main /> },
    {
      path: "/signup",
      element: <SignUp />,
    },
    { path: "/signin", element: <SignIn /> },
    {
      path: "/todo",
      element: <Todo />,
    },
    {
      path: "*",
      element: <NoMatch />,
    },
  ]);
  return <RouterProvider router={router} />;
};
export default Router;
```
</details>

<br>

### 2. 회원가입 :mag: [코드확인](https://github.com/hoinlee-moi/wanted-pre-onboarding-frontend/blob/main/src/pages/SignUp.js)
<br>

주어진 API서버가 있었기에 Axios라이브러리를 이용하여 회원가입을 구현 하였습니다.
- Input 값을 이용해 state 상태값을 받아 냈고 state 상태값을 통해 Axios로 데이터를 전송하였습니다.
- 이때 state 상태값을 받는 input이 많아짐으로 input 커스텀 훅을 제작하였습니다
<details>
<summary style="cursor : pointer;">코드 펼치기</summary> 

```javascript
import { useState, useCallback } from "react";

export default (initalValue) => {
  const [data, setData] = useState(initalValue);

  const handler = useCallback(
    (e) => {
      if (typeof data === "string") {
        setData(e.target.value);
        return;
      }
      const { value, name } = e.target;
      setData((data) => ({ ...data, [name]: value }));
    },
    []
  );
  return [data, handler];
};
```

</details>

- 해당 커스텀 훅으로 여러 스테이트 값을 사용하거나 컴포넌트 안에서 처리할 부분을 공통적으로 처리되게 만들었습니다.
- 객체 타입이 아닌 string에서도 사용할 수 있도록 만들었으나 단일 input은 useState로 처리 했습니다
- `new RegExp`를 사용하여 이메일 유효성 검사 정규식을 만들어 email 입력 검사를 하고 password는 `tirm()`을 사용해 공백 제거후 `length`로 유효성 검사를 진행했습니다.
- `useEffect`를 통해 각 input창이 적힐 때마다 유효성 검사를 진행했고 모두 통과 된다면 회원가입 버튼의 `disabled`가 해제되도록 했습니다.
- 회원가입 완료시 자동으로 `/signin`페이지로 이동되도록 react-router의 기능중인 `navigate`를 이용 하였고 이동 애니메이션 구현을 위해 `setTimeout`을 사용해 애니메이션 효과가 진행되는 동안만 딜레이 시켰습니다.

<details>
<summary style="cursor : pointer;">코드 펼치기</summary> 

```javascript
setTimeout(() => {
      navigate("/");
    }, 500);
```
</details>

<br><br>

### 3. 로그인  :mag: [코드확인](https://github.com/hoinlee-moi/wanted-pre-onboarding-frontend/blob/main/src/pages/SignIn.js)

<br>

- 똑같이 `signIn`페이지에 들어올 때 로컬 스토리지에서 `access-token`을 확인하여 있다면 `/todo`로 `navigate`를 통해 이동시킵니다.
- 회원가입과 UI나 기능적인 부분에서 굉장히 동일합니다.
- 주어진 API에 Axios를 사용하여 서버 통신을 시켰고 input 커스텀 훅을 이용해 여러 state 상태값을 관리 했습니다.
- 동일하게 `RegExp`와`trim()`,`length` 로 이메일과 비밀번호의 유효성 검사 로직을 구현했고 `useEffect`로 각 state값이 변할 때마다 체크되도록 하였습니다.
- 유효성 검사 통과시 로그인 버튼이 활성화 되며 로그인이 가능합니다.
- 로그인 완료시 Axios를 이용한 서버 응답에 담긴 `access-token`을 `localStorage.setItem("access_token", res.data.access_token)` 으로 저장합니다
- 이후 `navigate`를 통해 todo로 이동시키며 이때 뒤로가기를 비활성화시킵니다.

<br>

### 4. 투두리스트 :mag: [코드확인](https://github.com/hoinlee-moi/wanted-pre-onboarding-frontend/blob/main/src/pages/Todo.js)

<br>

- `/todo`페이지는 처음 접속시 `useEffect`를 통해 리스트 데이터를 불러오는 함수를 실행하고 실패시 `alert`과 함께 `/signin` 페이지로 리다이렉트 시킵니다.
- 이는 `access-token` 이 없는 걸 파악할 수 있는 방법 중 하나라고 생각합니다.
- `localStorage`에 직접 접근하여 `access-token`을 생성하거나 수정하여 `/todo`페이지로 접속할 수 있기 때문에 첫 컴포넌트 마운트시 서버 통신을 시도하고 실패시 로그인 할 수있도록 했습니다.
- `Axios`를 통해 정상적인 통신을 하면 하단 리스트에 체크된 리스트들이 상단 안된 리스트들이 하단으로 갈 수 있게 햇습니다.
- 각 CRUD 함수들또한 자식 컴포넌트들에게 props 끌어올리기나 드릴링을 방지할 수 있도록 컴포넌트들 전역적으로 관리할 수 있도록 `contextAPI`를 사용하였습니다.
- `/todo`페이지는 CRUD가 전부 포함 된 페이지로 여러 기능을 한꺼번에 관리할 수 있는 `useReducer`를 사용하여 리스트들을 관리했습니다.

<details>
<summary style="cursor : pointer;">코드 펼치기</summary> 

```javascript
const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CHECKED": {
      newState = state.filter((item) => item.id !== action.data.id);
      newState.push({ ...action.data });
      break;
    }
    case "UPDATE": {
      newState = state.map((item) =>
        item.id === action.data.id ? { ...action.data } : item
      );
      break;
    }
    case "CREATE": {
      newState = [...state, action.data];
      break;
    }
    case "DELETE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    default:
      return state;
  }

  return newState;
};

export default reducer;
```
</details>

<br><br>

#### 4.1 리스트 생성 :mag: [코드확인](https://github.com/hoinlee-moi/wanted-pre-onboarding-frontend/blob/main/src/components/TodoCreate.js)

<br>

- 페이지 상단의 input과 추가 버튼을 통해 새로운 리스트를 만들 수 있습니다.
- 새로 추가된 리스트는 상단 Todo컴포넌트에서 `contextAPI`로 보내온 `creat`함수로 다룰 수 있고 reducer를 통해 페이지에 보이는 list를 최신화 할 수 있습니다.
- 또한 create 함수는 Axios를 통해 서버에 해당 리스트를 저장하여 새로고침시에도 동일하게 출력됩니다.
- 이때 리스트 길이가 너무 길어지는 것을 방지하기 위해 input 창에서 최대 글자수를 제한하였습니다.
- 앞서 동일하게 `trim()`과 `length`를 사용하여 유효한 값이 있는지 확인하고 없다면 `useRef`를 통해 input창에 `focus`되도록 하였습니다.
- 엔터키 입력시 입력함수가 실행되도록 구현하였습니다.

#### 4.2 리스트 수정 및 삭제 :mag: [코드확인](https://github.com/hoinlee-moi/wanted-pre-onboarding-frontend/blob/main/src/components/TodoItem.js)

<br>

수정

- 각 아이템들은 `TodoList`컴포넌트에서 `map`을 이용해 컴포넌트별로 생성되도록 만들었습니다.
- 이때 처음 주어진 `todo`값을 수정 input이 열렸을 때 동일하게 input창안에 출력할 수 있도록 미리 state에 저장합니다.
- 수정 버튼을 누를 시 수정을 할것인지 `boolean`값으로 판단하는 state 값을 변경하고 클릭된 버튼의 이름에 따라 각각 수행하는 기능이 다르도록 작성했습니다.
- 따라서 수정,삭제,제출,취소 각각 4개의 버튼이 아닌 2개의 버튼으로 수정 boolean값으로 서로 변경되도록 만들었습니다.
- 각 리스트 별로 다른 값들을 가지고 있어야 하니 `contextAPI`로 전역으로 관리되는 함수만 가져옵니다.
- 생성과 동일하게 엔터 키 입력시 수정 함수가 동작하며 입력된 값으로 리스트는 변경됩니다.
- 변경과 동시에 수정 모드는 비활성화 됩니다.

<br>

삭제

- 수정 모드가 비활성화 상태일 때 수정 버튼 옆에 삭제버튼으로 존재하며 수정모드가 활성화 되면 취소로 변경됩니다.
- 삭제 버튼을 누를시 `contextAPI`를 통해 전달받은 삭제 함수가 실행됩니다.
- 삭제시에는 실수로 삭제되지 않도록 `window.confirm`을 이용하여 다시 한번 삭제 요청을 받고 `true`값이 들어온다면 삭제가 실행됩니다.

<br><br>

### 5.오류 페이지 및 로딩 컴포넌트

<br>

- `url` 마지막 `/` 이후 존재하지 않는 페이지로 접근할 경우 뜨는 `noMatch`페이지를 만들었으며 해당 페이지는 로딩 컴포넌트가 재생되고 `alert`창을 이용한 경고 이후 `/`으로 redirect 시킵니다.


> ## 트러블 슈팅



<br>

- `height:vh`로 부모 요소의 길이를 잡고 자식 요소에 `height:%`로 접근할 경우 올바르게 접근되지 않았다.
  - %가 적용될 수 있도록 부모 요소는 `@media` 쿼리를 이용하여 적절한 px값을 주었다.
  - 실시간 반응형을 한다면 동일하게 vh요소를 사용했을 것 같다.

<br>

- CSS에서 animation효과를 사용할 때 애니메이션 효과가 끝난 후 원래 가지고 있던 속성 때문에 요소가 사라지게 되는 현상
  - css animaion 속성을 줄 때 마지막 값에 forward효과를 붙여 애니메이션 효과가 끝날 때 적용한 속성이 그대로 유지되도록 변경한다.

<br>

- 커스텀 훅을 통한 state값을 만들었지만 이후 서버데이터 전송에 들어갈 body에는 필요없는 부분이 있었다.
  - 이는 트러블이라고 하긴 뭐하지만 state값에서 하나하나 빼서 body에 맞춰넣는 방식으로 해결했다.
  - 본래는 state값을 그대로 전달하려는 생각이었는데 body와 맞지않아 null값으로 메모리 초기화 후 delete 를 생각했었다.

<br>

- 반응형 CSS를 구성 중 뚝뚝 끊어지듯이 변하는 부분을 고쳐보려고 했다.
  - 먼저 기본 큰 창에선 vw을 이용해 창 크기에 맞는 font-size등을 보여주게 한다.
  - 창이 줄어들며 가장 작은 창에서도 (핸드폰) 볼 수 있을 적당한 px를 찾아낸다.
  - 큰 창에서 사용한 vw값이 몇 px의 width값에서 해당 font-size px를 나타내는지 계산한다.
  - 해당 width 값에서 `@media`쿼리를 적용해 반응형 완성
  - (px수치 * 100 / viewport widt) 가 계산법이지만 이미 잘 계산할 수 있는 사이트들이 있으니 google 참조

  <br>
- `reducer` 함수가 여러번 호출 되던 문제
  - 이는 이번 프로젝트에서 가장 크게 만난 문제로 리스트 작성 추가 버튼을 눌렀을 때 중복해서 동작이 일어나는 문제가 있었다.
  - 왜 그런지 기능 순서를 역탐색 `console.log` 사이사이에 넣어 어느 지점부터 중복해서 동작하는지 찾아봤다.
  - `reducer`함수에 들어올 때 중복 되었으며 이는 비동기와 동기의 차이점인것을 파악했다.
  - 먼저 나는 `reducer`안에 Axios를 활용한 서버 통신 함수들을 만들어 놓고 `reducer`의 `switch`문을 통해 동작할 때 적절히 사용되도록 했다.
  - 이는 문제의 원이있엇고 기본적인 서버 통신 `pormise`는 비동기로 사용되며 `reducer`는 동기적으로 사용되다 보니 생기는 문제였다.
  - 결국 `reducer` 에서 서버 통신 함수를 빼내와 `Todo` 컴포넌트로 옮긴 이후 `contextAPI`를 통해 전역적으로 관리하여 해결하였다.

  <br><br><br>

> ## 회고

<br>

  - 회고 : [보러가기](https://velog.io/@lee_moi/%EC%9B%90%ED%8B%B0%EB%93%9C-pre-onboarding-%EA%B3%BC%EC%A0%9C-%ED%9A%8C%EA%B3%A0)
