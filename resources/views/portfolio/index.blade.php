<!DOCTYPE html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>심설송 포트폴리오</title>
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('/css/portfolio/font-awesome/css/font-awesome.min.css')}}">
    <link href="{{asset('/css/portfolio/bootstrap.min.css')}}" rel="stylesheet">
    <link href="{{asset('/css/portfolio/styles.css')}}" rel="stylesheet">

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-P8D47XZ');</script>
    <!-- End Google Tag Manager -->
</head>

<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P8D47XZ"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

<div id="mobile-menu-open" class="shadow-large">
    <i class="fa fa-bars" aria-hidden="true"></i>
</div>
<!-- End #mobile-menu-toggle -->
<header>
    <div id="mobile-menu-close">
        <span>Close</span> <i class="fa fa-times" aria-hidden="true"></i>
    </div>
    <ul id="menu" class="shadow">
        <li>
            <a href="#about">About</a>
        </li>
        <li>
            <a href="#experience">Experience</a>
        </li>
        <li>
            <a href="#education">Education</a>
        </li>
        <li>
            <a href="#projects">Projects</a>
        </li>
        <li>
            <a href="#skills">Skills</a>
        </li>
        <li>
            <a href="#contact">Contact</a>
        </li>
    </ul>
</header>
<!-- End header -->

<div id="lead">
    <div id="lead-content">
        <h1>심설송</h1>
        <h2>Back-end Developer</h2>
        <!--<a href="#" class="btn-rounded-white">Download Resume</a>-->
    </div>
    <!-- End #lead-content -->

    <div id="lead-overlay"></div>

    <div id="lead-down">
        <span>
            <i class="fa fa-chevron-down" aria-hidden="true"></i>
        </span>
    </div>
    <!-- End #lead-down -->
</div>
<!-- End #lead -->

<div id="about">
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <h2 class="heading">About Me</h2>
            </div>
            <div class="col-md-8">
                <p>
{{--                    제가 지금까지 해왔던 웹 서비스 개발은 새로운 사업을 위해 사이트를 런칭하고, 기획팀에서 사이트를 관리하기 위해 관리자페이지를 개발하며,--}}
{{--                    내부 운영에 필요한 웹 기반 시스템 개발이였습니다. 저는 하나의 플랫폼에서 여러가지 기술스텍을 적용하고 다양한 기능을 구현하여 서비스를--}}
{{--                    고도화하고 싶습니다. 기존의 시스템을 최대한 빠른 시간내에 파악하겠으며 지속적으로 새로운 기술을 습득하고 현 시스템의 고도화에 도움이 될지--}}
{{--                    검토하겠습니다. 저는 웹개발 관련 분야에서 저의 전문성를 향상하고 커리어 경험을 계속 쌓아가고 싶습니다.--}}
                </p>
            </div>
        </div>
    </div>
</div>
<!-- End #about -->

<div id="experience" class="background-alt">
    <h2 class="heading">Experience</h2>
    <div id="experience-timeline">
        <div data-date="2016.08 ~ 현재">
            <h3>해커스 교육그룹</h3>
            <h4>모듈개발1팀 사원</h4>
            <p>
                웹 사이트, 웹 기반 CMS 시스템, 웹 기반 자동화 시스템 개발
            </p>
        </div>

        {{--<div data-date="September 발2015 – September 2016">
            <h3>Employer Name</h3>
            <h4>Job Title</h4>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in iaculis ex. Etiam volutpat laoreet urna. Morbi ut tortor nec nulla commodo malesuada sit amet vel lacus. Fusce eget efficitur libero. Morbi dapibus porta quam laoreet placerat.
            </p>
        </div>--}}

    </div>
</div>
<!-- End #experience -->

<div id="education">
    <h2 class="heading">Education</h2>
    <div class="education-block">
        <h3>숭실대학교 일반대학원</h3>
        <span class="education-date">2013.09 - 2015.08</span>
        <h4>미디어학과 석사과정</h4>
        <p>
            웹 기반 2D/3D 그래픽 렌더링 기술 연구 (2013.09 - 2013.12)
            창의력 향상을 위한 과학 체험 교육용 3D 콘텐츠의 그래픽엔진 및 프레임워크 기술 개발 (2014.08 - 2015.06)
        </p>
    </div>
    <!-- End .education-block -->

    <div class="education-block">
        <h3>중국 연변대학</h3>
        <span class="education-date">2007.09 - 2011.06</span>
        <h4>컴퓨터공학 학사</h4>
        <ul>
            <li>프로그래밍 기초</li>
            <li>데이터 구조</li>
            <li>알고리즘의 이해</li>
            <li>운영체제</li>
            <li>객체지향 프로그래밍</li>
        </ul>
    </div>
    <!-- End .education-block -->
</div>
<!-- End #education -->

<div id="projects" class="background-alt">
    <h2 class="heading">Projects</h2>
    <div class="container">
        <div class="row">
            {{--<div class="project shadow-large">
                <div class="project-image">
                    <img src="{{asset('/image/portfolio/project.jpg')}}" />
                </div>
                <!-- End .project-image -->
                <div class="project-info">
                    <h3>해커스 ONE 앱 프로젝트</h3>
                    <p>진행기간 : 2020.05 ~ 현재</p>
                    <p>사용기술 : PHP7(Laravel5.4) Javascript(JQuery), MariaDB, Bootstrap3</p>
                    <p>담당업무 : 해커스 ONE 앱 백엔드 API, Admin페이지 개발</p>
                </div>
                <!-- End .project-info -->
            </div>
            <!-- End .project -->

            <div class="project shadow-large">
                <div class="project-image">
                    <img src="{{asset('/image/portfolio/project.jpg')}}" />
                </div>
                <!-- End .project-image -->
                <div class="project-info">
                    <h3>해커스 마케팅 키워드 자동입찰 시스템 개발</h3>
                    <p>진행기간 : 2020.02 ~ 2020.04</p>
                    <p>사용기술 : PHP7(Laravel6), Javascript(JQuery), MariaDB, Bootstrap3</p>
                    <p>담당업무 : Admin페이지, API연동 로직 개발</p>
                </div>
                <!-- End .project-info -->
            </div>
            <!-- End .project -->

            <div class="project shadow-large">
                <div class="project-image">
                    <img src="{{asset('/image/portfolio/project.jpg')}}" />
                </div>
                <!-- End .project-image -->
                <div class="project-info">
                    <h3>해커스 공무원 학원 강의실 관리&좌석예약 시스템 개발</h3>
                    <p>진행 기간 : 2019.09 ~ 2019.11</p>
                    <p>사용기술 : PHP5, Javascript(JQuery), MariaDB, Bootstrap3</p>
                    <p>담당업무 : 해커스 공무원 사이트 강의실관리 모듈, 좌석예약 모듈 개발</p>
                </div>
                <!-- End .project-info -->
            </div>
            <!-- End .project -->

            <div class="project shadow-large">
                <div class="project-image">
                    <img src="{{asset('/image/portfolio/project.jpg')}}" />
                </div>
                <!-- End .project-image -->
                <div class="project-info">
                    <h3>해커스 YES24 인터넷서점 주문 모듈 개발</h3>
                    <p>진행 기간 : 2019.08 ~ 2019.09</p>
                    <p>사용기술 : PHP5(Codeigniter), MariaDB</p>
                    <p>담당업무 : YES24 API 연동하여 교재 주문 모듈 개발</p>
                </div>
                <!-- End .project-info -->
            </div>
            <!-- End .project -->

            <div class="project shadow-large">
                <div class="project-image">
                    <img src="{{asset('/image/portfolio/project.jpg')}}" />
                </div>
                <!-- End .project-image -->
                <div class="project-info">
                    <h3>해커스 California 학원 프로젝트 수행</h3>
                    <p>진행 기간 : 2019.07 ~ 2019.07</p>
                    <p>사용기술 : PHP7.2(Laravel5), Javascript(JQuery), MariaDB</p>
                    <p>담당업무 : 해커스 California 학원 사이트 Admin페이지 매출관리, 시스템관리 부분 개발</p>
                </div>
                <!-- End .project-info -->
            </div>
            <!-- End .project -->

            <div class="project shadow-large">
                <div class="project-image">
                    <img src="{{asset('/image/portfolio/project.jpg')}}" />
                </div>
                <!-- End .project-image -->
                <div class="project-info">
                    <h3>해커스 일본어 수강료 통합정산시스템 개발</h3>
                    <p>진행 기간 : 2018.12 ~ 2019.03</p>
                    <p>사용기술 : PHP5.1, Javascript(JQuery), MariaDB</p>
                    <p>담당업무 : 해커스 일본어 사이트 매출정산 시스템 개발</p>
                </div>
                <!-- End .project-info -->
            </div>
            <!-- End .project -->

            <div class="project shadow-large">
                <div class="project-image">
                    <img src="{{asset('/image/portfolio/project.jpg')}}" />
                </div>
                <!-- End .project-image -->
                <div class="project-info">
                    <h3>해커스 경영아카데미, 해커스 일본어 사이트 구축</h3>
                    <p>진행 기간 : 2018.08 ~ 2018.12</p>
                    <p>사용기술 : PHP7, Javascript(JQuery), MariaDB</p>
                    <p>담당업무 : 해커스 통합 프로젝트의 서비스 페이지 개발</p>
                </div>
                <!-- End .project-info -->
            </div>
            <!-- End .project -->

            <div class="project shadow-large">
                <div class="project-image">
                    <img src="{{asset('/image/portfolio/project.jpg')}}" />
                </div>
                <!-- End .project-image -->
                <div class="project-info">
                    <h3>해커스 공기업 모바일 사이트 개발</h3>
                    <p>진행 기간 : 2018.06 ~ 2018.07</p>
                    <p>사용기술 : PHP5(Codeigniter), Javascript(JQuery), MariaDB</p>
                    <p>담당업무 : 해커스 공기업 모바일 사이트 전체 서비스 페이지 개발</p>
                </div>
                <!-- End .project-info -->
            </div>
            <!-- End .project -->

            <div class="project shadow-large">
                <div class="project-image">
                    <img src="{{asset('/image/portfolio/project.jpg')}}" />
                </div>
                <!-- End .project-image -->
                <div class="project-info">
                    <h3>해커스 사이트 통합시스템 개발</h3>
                    <p>진행 기간 : 2017.09 ~ 2017.12</p>
                    <p>사용기술 : PHP7(Laravel), Javascript(JQuery), MariaDB</p>
                    <p>담당업무 : Admin페이지 개발과 유지보수</p>
                </div>
                <!-- End .project-info -->
            </div>--}}
            <!-- End .project -->
        </div>
    </div>
</div>
<!-- End #projects -->

<div id="skills">
    <h2 class="heading">Skills</h2>
    <ul>
        <li>PHP7</li>
        <li>Laravel</li>
        <li>Codeigniter</li>
        <li>Javascript(JQuery)</li>
        <li>Bootstrap</li>
        <li>Java</li>
        <li>MariaDB</li>
        <li>Redis</li>
        <li>Git</li>
        <li>Linux</li>
    </ul>
</div>
<!-- End #skills -->

<div id="contact">
    <h2>Get in Touch</h2>
    <div id="contact-form">
        <form method="POST" action="https://formspree.io/email@email.com">
            <input type="hidden" name="_subject" value="Contact request from personal website" />
            <input type="email" name="_replyto" placeholder="Your email" required>
            <textarea name="message" placeholder="Your message" required></textarea>
            <button type="submit">Send</button>
        </form>
    </div>
    <!-- End #contact-form -->
</div>
<!-- End #contact -->

<footer>
    <div class="container">
        <div class="row">
            <div class="col-sm-5 copyright">
                <p>
                    Copyright &copy; 2020 심설송
                </p>
            </div>
            <div class="col-sm-2 top">
                <span id="to-top">
                    <i class="fa fa-chevron-up" aria-hidden="true"></i>
                </span>
            </div>
            <div class="col-sm-5 social">
                <ul>
                    <li>
                        <a href="https://github.com/songxue77" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/snowbrightly" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                    </li>
                    <li>
                        <a href="https://blog.naver.com/songxue7777" target="_blank"><i class="fa fa-bluetooth" aria-hidden="true"></i></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</footer>
<!-- End footer -->

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="{{asset('/js/portfolio/scripts.min.js')}}"></script>
</body>

</html>
