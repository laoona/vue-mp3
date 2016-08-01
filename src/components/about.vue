<template>
    <div class="view-login" transition="expand">
        <div class="header" id="app">
            <header>
                <button class="header-btn-left" v-link="'/'"><i class="ico ico-back"></i></button>
                <p class="header-txt">关于</p>
            </header>
        </div>

        <section class="login-fields">
            <div class="about-txt">
                <p>
                    qq: <a class="about-link">370755574</a>
                </p>
                <p>
                    blog: <a href="http://laoono.com" class="about-link">http://laoono.com</a>
                </p>
                <p>
                    github: <a href="https://github.com/laoono" class="about-link">https://github.com/laoono</a>
                </p>
            </div>
        </section>
    </div>
</template>
<style>
    [data-dpr="2"] .about-txt {
        font-size: 26px;
    }

    [data-dpr="2.5"] .about-txt {
        font-size: 33px;
    }

    [data-dpr="2.75"] .about-txt {
        font-size: 36px;
    }

    [data-dpr="3"] .about-txt {
        font-size: 39px;
    }

    [data-dpr="4"] .about-txt {
        font-size: 52px;
    }

    .about-txt {
/*        position: relative;
        top: 30%;
        left: 50%;*/
        color: rgba(255, 255, 255, .7);
        line-height: 1.5;
        padding: 0.3125rem 0;
/*        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);*/
    }

    .about-txt p {
        font-size: 1.2em;
        line-height: 2;
    }

    .about-link {
        color: rgba(255, 255, 255, 1);
    }
</style>

