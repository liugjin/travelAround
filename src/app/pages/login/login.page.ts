import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { mergeMap } from 'rxjs/operators';
import { GlobalData } from '../../providers/GlobalData';
import { Storage } from '../../providers/Storage';
import { Helper } from '../../providers/Helper';
import { UserInfo } from '../../interfaces/UserInfo';
import { NavController } from '@ionic/angular';
import { HttpService } from '../../providers/HttpService';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loading = false;
    model = {
        username: 'test',
        password: '123456'
    };
    nameMsg: string = '';
    errorMsg: string = '';
    pwdMsg: string = '';
    status: boolean = false;

    constructor(public navCtrl: NavController,
        public helper: Helper,
        public http: HttpService,
        public auth: AuthService) {
    }

    //内容发生改变时触发的事件
    onChange(type: number) {
        if (type == 1) {
            //用户名校验
            let nameReg = /^[a-zA-Z0-9_-]{0,}$/;
            if (!nameReg.test(this.model.username)) {
                this.nameMsg = '用户名不能含有中文或特殊字符！';
            } else if (this.model.username.length > 25) {
                this.nameMsg = '用户名超过长度限制！';
            } else if (this.model.username.length <= 0) {
                this.nameMsg = '用户名不能为空！';
            } else {
                this.nameMsg = '';
            }
        } else if (type == 2) {
            //密码校验
            //包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
            //let pwdReg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
            //6-20个字母、数字、下划线
            let pwdReg = /^(\w){6,20}$/;
            if (this.model.password.length < 6 || this.model.password.length > 20) {
                this.pwdMsg = '密码长度为6~20位';
            } else if (!pwdReg.test(this.model.password)) {
                this.pwdMsg = '密码由字母、数字、下划线组成';
            } else {
                this.pwdMsg = '';
            }
        }
        this.errorMsg = this.nameMsg.length <= 0 ? this.pwdMsg : this.nameMsg;
        if (
            this.errorMsg.length <= 0 &&
            this.model.username.length > 0 &&
            this.model.password.length > 0
        ) {
            //登录按钮可以点击
            this.status = true;
        } else {
            //登录按钮不可点击
            this.status = false;
        }
    }
    //失去焦点 【(ionFocus)="onFocus()"获取焦点时的事件】
    onBlur() {
        if (this.model.username.length <= 0) {
            this.errorMsg = '用户名不能为空！';
        } else if (this.model.password.length <= 0) {
            this.errorMsg = '密码不能为空！';
        }
    }
    ngOnInit() { }
    onLogin() {
        this.loading = true;
        this.auth.getToken(this.model.username, this.model.password).pipe(
            mergeMap(token => {
                GlobalData.token = token;
                Storage.localStorage.set('token', token);
                return this.auth.getUserInfo();
            })
        ).subscribe((userInfo: UserInfo) => {
            this.loading = false;
            this.helper.loginSuccessHandle(userInfo);
            this.navCtrl.navigateRoot('/tabs/find');
        }, () => {
            this.loading = false;
        });
    }
    toRegister() {
        this.navCtrl.navigateForward('/register');
    }
}
