import Svg, {Circle, ClipPath, Defs, Image, Path, Pattern, Use} from "react-native-svg";

export const SvgLogo = (props) => (
    <Svg
        width={35}
        height={26}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M.04 13.597C2.506 20.514 9.532 25.51 17.805 25.51c7.708 0 14.334-4.338 17.195-10.527-4.164 4.507-10.19 7.339-16.888 7.339C10.75 22.322 4.2 18.9.04 13.597Z"
            fill="#EBEBEB"
        />
        <Path
            d="M21.76 18.428c3.92 0 7.097-3.137 7.097-7.006 0-3.87-3.177-7.006-7.096-7.006-3.92 0-7.097 3.137-7.097 7.006 0 3.87 3.178 7.006 7.097 7.006Z"
            fill="#EBEBEB"
        />
        <Path
            d="M26.277 9.947c.61 0 1.106-.454 1.106-1.014s-.495-1.014-1.106-1.014c-.611 0-1.106.454-1.106 1.014s.495 1.014 1.106 1.014Z"
            fill="#000"
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M34.989 13.111C32.315 5.583 25.14.29 16.87.517 9.165.73 2.673 5.675 0 12.55c4.026-5.063 9.965-8.338 16.66-8.523 7.36-.202 14.01 3.375 18.329 9.084Z"
            fill="#E8E8E8"
        />
    </Svg>
)


export const SvgFilterIcon = (props) => (
    <Svg
        width={25}
        height={25}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...props}
    >
        <Path fill="url(#a)" d="M0 0h25v25H0z" />
        <Defs>
            <Pattern
                id="a"
                patternContentUnits="objectBoundingBox"
                width={1}
                height={1}
            >
                <Use xlinkHref="#b" transform="scale(.01042)" />
            </Pattern>
            <Image
                id="b"
                width={96}
                height={96}
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAACV0lEQVR4nO3csW4TQRSF4R9EQ40RBFpaeAVEGwLUiBKJBp4HOTRIvAGIvA4UgYYUBAoKgoHCWEIuNp54du+dyf9J07m4Myfxar1HC5IkSZLOmwvRA6y5ATwB7gJ3gCvAH+AQ+AgcAG+BT1ED9uo68Ab4yfLAh9YJ8IplWKrgIXDM6Qe/vr4DDwLm7cozYEH54a/WAngx+dSd2AN+cfbD/z8E/xMKzYAjtj/81foG7Ey6g8bNqXf4q7U/6Q4aNgN+UD+AE+DmhPuo4uIGn6l9UEfA5Zqb+OcS8GiDz9Xez2lr0CYBtGQ3eoBSvQVwK3qAUr0F0OU1oCW/owco1VsAn6MHKNVbAB+iByjVWwDvowdogTdiCbykfgDzSXfQuBnwhXqHf8zyoY4K7FLv5+j7E8/ejadsF8ICeD751J3ZA75ytq8d//IruQa8ZvOH8nM6+c7PVkvZAR4D94DbwFWWPy8csrzJOgDe0eAdryRJ67JdhGuzaxrErmkgu6aB7JoGsmsayK5pMLumgZp+xBnRDa29sndNB/XWiqht9K6pAQwbvWtqAMNSXAPOs9G7pgYwbPQnbwYwbPSuqQEMs2u6gaZvxHph1zSYXdME7JomYNc0AbumCTTTNe29lmLXVJKU1tgXYbuZQexmBrKbGchuZiC7mYHsZgazmxnIR4JbqNENzd7NjF6DsrcimnsPaKnsATT3HtBS2QPwGhCsufeAlsoeQPdPqrIH0Nx7QEtlD8Bu5ga8EUvAbmYwu5kJ2M1MwG5mAnYzE2immxlt7FqK3UxJkiRJWvMXadKsUStafT8AAAAASUVORK5CYII="
            />
        </Defs>
    </Svg>
)

export const SvgEmployeeAvatar = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={60}
        height={60}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#fff"
        fillRule="evenodd"
        {...props}
    >
        <Path
            d="M26.34 36.74a19.674 19.674 0 0 1-9.54-5.207c-4.216 2.07-6.3 5.123-6.3 9.334v14.29c2.027.944 7.25 3.067 14.515 3.843l-1.698-1.358a1.82 1.82 0 0 1-.65-1.792l3.673-19.11zm4.262-3.17c8.876 0 16.099-7.273 16.099-16.21S39.478 1.15 30.602 1.15c-8.87 0-16.086 7.273-16.086 16.21s7.216 16.21 16.087 16.21z"
            fill="#647f94"
            fillRule="nonzero"
        />
        <Path
            d="m29.937 37.37-3.469 18.12 4.284 3.425 4.275-3.422-3.52-18.124z"
            fill="#6ec4a7"
            fillRule="nonzero"
        />
        <Path
            d="M44.425 31.521a19.687 19.687 0 0 1-9.332 5.162l3.736 19.162a1.827 1.827 0 0 1-.645 1.798l-1.607 1.285c4.48-.535 9.335-1.705 14.423-3.837V40.867c0-4.216-2.175-7.274-6.575-9.346z"
            fill="#647f94"
            fillRule="nonzero"
        />
    </Svg>
)


export const SvgCommonAvatar = (props) => (
    <Svg
        height={64}
        width={64}
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Circle cx={32} cy={32} fill="#4F5D73" r={32} />
        <Path
            d="M43.905 47.543c-3.821-1.66-5.217-4.242-5.643-6.469 2.752-2.215 4.943-5.756 6.148-9.573 1.239-1.579 1.96-3.226 1.96-4.62 0-.955-.347-1.646-.955-2.158-.203-8.106-5.942-14.613-13.039-14.714-.054 0-.108-.009-.163-.009-.022 0-.043.004-.065.004-7.052.039-12.783 6.41-13.125 14.409-.884.528-1.394 1.305-1.394 2.469 0 1.641.992 3.63 2.663 5.448 1.187 3.327 3.118 6.38 5.5 8.438-.354 2.292-1.699 5.039-5.697 6.776-2.159.938-6.105 1.781-7.808 2.649 4.362 4.769 12.624 7.769 19.589 7.805l.099.003c.008-.002.017-.001.025-.001 7.014 0 15.325-3.01 19.713-7.808-1.703-.868-5.65-1.711-7.808-2.649z"
            fill="#231F20"
            opacity={0.2}
        />
        <Path
            d="M43.905 45.543c-3.821-1.66-5.217-4.242-5.643-6.469 2.752-2.215 4.943-5.756 6.148-9.573 1.239-1.579 1.96-3.226 1.96-4.62 0-.955-.347-1.646-.955-2.158-.202-8.105-5.941-14.613-13.037-14.713-.056-.001-.11-.01-.165-.01-.022 0-.043.004-.065.004-7.052.039-12.783 6.41-13.125 14.409-.884.528-1.394 1.305-1.394 2.469 0 1.641.992 3.63 2.663 5.448 1.187 3.327 3.118 6.38 5.5 8.438-.354 2.292-1.699 5.039-5.697 6.776-2.159.938-6.105 1.781-7.808 2.649 4.362 4.769 12.624 7.769 19.589 7.805l.099.003c.008-.002.017-.001.025-.001 7.014 0 15.325-3.01 19.713-7.808-1.703-.868-5.65-1.711-7.808-2.649z"
            fill="#FFF"
        />
    </Svg>
)
