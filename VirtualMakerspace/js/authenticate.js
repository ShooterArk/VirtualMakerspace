(function($, Models, Collections, Views) {
    Views.Auth = Backbone.View.extend({
        events: {
            // user register
            'submit form.signup_form': 'doRegister',
            // user login
            'submit form.signin_form': 'doLogin',
            // user forgot password
            'submit form.forgot_form': 'doSendPassword',
        },
        /**
         * init view setup Block Ui and Model User
         */
        initialize: function() {
            this.user = AE.App.user;
            this.blockUi = new Views.BlockUi();
            this.initValidator();
            //check button
            var clickCheckbox = document.querySelector('.sign-up-switch'),
                roleInput = $("input#role"),
                hire_text = $('.hire-text').val();
                work_text = $('.work-text').val();
            view = this;
            if ($('.sign-up-switch').length > 0) {
                if($('#signup_form, .signup_form').find('span.user-role').hasClass('hire'))
                {
                    $('.sign-up-switch').parents('.user-type').find('small').css({
                        "left" :  -5 + "px"
                    })
                }
                clickCheckbox.onchange = function(event) {
                    //console.log(view.$('.user-type span.text').text());
                    var _this = $(event.currentTarget);
                    var _switch = _this.parents('.user-type');
                    if (clickCheckbox.checked) {
                        roleInput.val("freelancer");
                        view.$('.user-type span.text').text(work_text).removeClass('hire').addClass('work');
                        _switch.find('small').css({
                            "left" :  (_switch.find('.switchery').width() - _switch.find('small').width() + 5) + "px"
                        });
                    } else {
                        roleInput.val("employer");
                        view.$('.user-type span.text').text(hire_text).removeClass('work').addClass('hire');
                        _switch.find('small').css({
                            "left" :  -5 + "px"
                        })
                    }
                };
            }
        },
        /**
         * init form validator rules
         * can override this function by using prototype
         */
        initValidator: function() {
            // login rule
            this.login_validator = $("form.signin_form").validate({
                rules: {
                    user_login: "required",
                    user_pass: "required"
                }
            });
            /**
             * register rule
             */
            if ($('#agreement').length > 0) {
                this.register_validator = $("form.signup_form").validate({
                    rules: {
                        user_login: "required",
                        user_pass: "required",
                        agreement : "required",
                        user_email: {
                            required: true,
                            email: true
                        },
                        repeat_pass: {
                            required: true,
                            equalTo: "#user_pass"
                        }
                    }
                });
            } else {
                this.register_validator = $("form.signup_form").validate({
                    rules: {
                        user_login: "required",
                        user_pass: "required",
                        user_email: {
                            required: true,
                            email: true
                        },
                        repeat_pass: {
                            required: true,
                            equalTo: "#user_pass"
                        }
                    }
                });
            }
            /**
             * forgot pass email rule
             */
            this.forgot_validator = $("form.forgot_form").validate({
                rules: {
                    user_email: {
                        required: true,
                        email: true
                    },
                }
            });
        },
        /**
         * user sign-up catch event when user submit form signup
         */
        doRegister: function(event) {
            event.preventDefault();
            event.stopPropagation();
            /**
             * call validator init
             */
            this.initValidator();
            var form = $(event.currentTarget),
                button = form.find('button.btn-submit'),
                view = this;
            /**
             * scan all fields in form and set the value to model user
             */
            form.find('input, textarea, select').each(function() {
                view.user.set($(this).attr('name'), $(this).val());
            })
            // check form validate and process sign-up
            if (this.register_validator.form() && !form.hasClass("processing")) {
                this.user.set('do', 'register');
                this.user.request('create', {
                    beforeSend: function() {
                        view.blockUi.block(button);
                        form.addClass('processing');
                    },
                    success: function(user, status, jqXHR) {
                        view.blockUi.unblock();
                        form.removeClass('processing');
                        // trigger event process authentication
                        AE.pubsub.trigger('ae:user:auth', user, status, jqXHR);
                        if (status.success) {
                            AE.pubsub.trigger('ae:notification', {
                                msg: status.msg,
                                notice_type: 'success'
                            });
                        } else {
                            AE.pubsub.trigger('ae:notification', {
                                msg: status.msg,
                                notice_type: 'error'
                            });
                        }
                    }
                });
            }
        },
        /**
         * user login,catch event when user submit login form
         */
        doLogin: function(event) {
            event.preventDefault();
            event.stopPropagation();
            /**
             * call validator init
             */
            this.initValidator();
            var form = $(event.currentTarget),
                button = form.find('button.btn-submit'),
                view = this;
            /**
             * scan all fields in form and set the value to model user
             */
            form.find('input, textarea, select').each(function() {
                view.user.set($(this).attr('name'), $(this).val());
            })
            // check form validate and process sign-in
            if (this.login_validator.form() && !form.hasClass("processing")) {
                this.user.set('do', 'login');
                this.user.request('read', {
                    beforeSend: function() {
                        view.blockUi.block(button);
                        form.addClass('processing');
                    },
                    success: function(user, status, jqXHR) {
                        view.blockUi.unblock();
                        form.removeClass('processing');
                        // trigger event process authentication
                        AE.pubsub.trigger('ae:user:auth', user, status, jqXHR);
                        if (status.success) {
                            AE.pubsub.trigger('ae:notification', {
                                msg: status.msg,
                                notice_type: 'success'
                            });
                        } else {
                            AE.pubsub.trigger('ae:notification', {
                                msg: status.msg,
                                notice_type: 'error'
                            });
                        }
                    }
                });
            }
        },
        /**
         * user forgot password
         */
        doSendPassword: function(event) {
            event.preventDefault();
            event.stopPropagation();
            /**
             * call validator init
             */
            this.initValidator();
            var form = $(event.currentTarget),
                email = form.find('input#user_email').val(),
                button = form.find('button.btn-submit'),
                view = this;
            if (this.forgot_validator.form() && !form.hasClass("processing")) {
                this.user.set('user_login', email);
                this.user.set('do', 'forgot');
                this.user.request('read', {
                    beforeSend: function() {
                        view.blockUi.block(button);
                        form.addClass('processing');
                    },
                    success: function(user, status, jqXHR) {
                        form.removeClass('processing');
                        view.blockUi.unblock();
                        if (status.success) {
                            AE.pubsub.trigger('ae:notification', {
                                msg: status.msg,
                                notice_type: 'success'
                            });
                        } else {
                            AE.pubsub.trigger('ae:notification', {
                                msg: status.msg,
                                notice_type: 'error'
                            });
                        }
                    }
                });
            }
        }
    });
})(jQuery, window.AE.Models, window.AE.Collections, window.AE.Views);
