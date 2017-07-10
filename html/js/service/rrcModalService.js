define(['app'], function (app) {
    app.register.service('rrcModalService', ['$http', function ($http) {
        var modals = [];
        var getCurrent = function (target) {
            var i;
            if (target) {
                for (i = 0; i < modals.length; i += 1) {
                    if (target.attr('id') === modals[i].$elm.attr('id')) {
                        return modals[i];
                    }
                }
            }
            return modals.length ? modals[modals.length - 1] : null;
        };
        var selectCurrent = function () {
            var i,
                selected = false;
            for (i = modals.length - 1; i >= 0; i--) {
                if (modals[i].$blocker) {
                    modals[i].$blocker.toggleClass('current', !selected).toggleClass('behind', selected);
                    selected = true;
                }
            }
        };
        var rrcModal = function (options) {
            var remove, target;
            this.$body = options.container || $('body');
            this.options = $.extend({}, rrcModal.defaults, options);
            this.options.doFade = !isNaN(parseInt(this.options.fadeDuration, 10));
            this.$blocker = null;
            //if (this.options.closeExisting)
            //while (rrcModal.isActive())
            // rrcModal.close(); // Close any open modals.
            modals.push(this);
            if (options.template) { //页内div
                this.$elm = options.template;
                this.$body.append(this.$elm);
                this.open();
            } else if (options.templateUrl) { //ajax
                target = options.templateUrl;
                this.$elm = $('<div>');
                this.$body.append(this.$elm);
                remove = function (event, modal) {
                    modal.elm.remove();
                };
                this.showSpinner();
                $http.get(target, {
                    params: options.param
                }).success(function (html) {
                    if (!rrcModal.isActive()) return;
                    var current = getCurrent();
                    current.$elm.empty().append(html).on(rrcModal.CLOSE, remove);
                    current.hideSpinner();
                    current.open();
                }).error(function () {
                    var current = getCurrent();
                    current.hideSpinner();
                    modals.pop(); // remove expected modal from the list
                });
            }
        };

        rrcModal.prototype = {
            constructor: rrcModal,
            open: function () {
                var m = this;
                this.block();
                if (this.options.doFade) {
                    setTimeout(function () {
                        m.show();
                    }, this.options.fadeDuration * this.options.fadeDelay);
                } else {
                    this.show();
                }
                $(document).off('keydown.modal').on('keydown.modal', function (event) {
                    var current = getCurrent();
                    if (event.which == 27 && current.options.escapeClose) current.close();
                });
                if (this.options.clickClose)
                    this.$blocker.click(function (e) {
                        if (e.target == this)
                            rrcModal.close();
                    });
            },

            close: function () {
                modals.splice($.inArray(this, modals), 1);
                this.unblock();
                this.hide();
                if (!rrcModal.isActive())
                    $(document).off('keydown.modal');
            },

            block: function () {
                this.$elm.trigger(rrcModal.BEFORE_BLOCK, [this._ctx()]);
                this.$body.css({overflow:'hidden', position: 'relative'});
                this.$blocker = $('<div class="jquery-modal rrc-blocker current"></div>').appendTo(this.$body);
                //selectCurrent();
                if (this.options.doFade) {
                    this.$blocker.css('opacity', 0).animate({opacity: 1}, this.options.fadeDuration);
                }
                this.$elm.trigger(rrcModal.BLOCK, [this._ctx()]);
            },

            unblock: function (now) {
                if (!now && this.options.doFade)
                    this.$blocker.fadeOut(this.options.fadeDuration, this.unblock.bind(this, true));
                else {
                    this.$blocker.children().appendTo(this.$body);
                    this.$blocker.remove();
                    this.$blocker = null;
                    // selectCurrent();
                    if (!rrcModal.isActive())
                        this.$body.css('overflow', '');
                }
            },

            show: function () {
                this.$elm.trigger(rrcModal.BEFORE_OPEN, [this._ctx()]);
                /*if (this.options.showClose) {
                    this.closeButton = $('<a href="#close-modal" rel="modal:close" class="close-modal ' + this.options.closeClass + '">' + this.options.closeText + '</a>');
                    this.$elm.append(this.closeButton);
                }*/
                this.$elm.addClass(this.options.modalClass).appendTo(this.$blocker);
                if (this.options.doFade) {
                    this.$elm.css('opacity', 0).show().animate({opacity: 1}, this.options.fadeDuration);
                } else {
                    this.$elm.show();
                }
                this.$elm.trigger(rrcModal.OPEN, [this._ctx()]);
            },

            hide: function () {
                this.$elm.trigger(rrcModal.BEFORE_CLOSE, [this._ctx()]);
                if (this.closeButton) this.closeButton.remove();
                var _this = this;
                if (this.options.doFade) {
                    this.$elm.fadeOut(this.options.fadeDuration, function () {
                        _this.$elm.trigger(rrcModal.AFTER_CLOSE, [_this._ctx()]);
                    });
                } else {
                    this.$elm.hide(0, function () {
                        _this.$elm.trigger(rrcModal.AFTER_CLOSE, [_this._ctx()]);
                    });
                }
                this.$elm.trigger(rrcModal.CLOSE, [this._ctx()]);
            },

            showSpinner: function () {
                if (!this.options.showSpinner) return;
                this.spinner = this.spinner || $('<div class="' + this.options.modalClass + '-spinner"></div>')
                        .append(this.options.spinnerHtml);
                this.$body.append(this.spinner);
                this.spinner.show();
            },

            hideSpinner: function () {
                if (this.spinner) this.spinner.remove();
            },

            //Return context for custom events
            _ctx: function () {
                return {elm: this.$elm, $blocker: this.$blocker, options: this.options};
            }
        };

        rrcModal.close = function(event) {
            if (event) event.preventDefault();
            var target = $(event.target).parents(".rrc-modal");
            var current = getCurrent(target);
            current.close();
            return current.$elm;
        };

        // Returns if there currently is an active modal
        rrcModal.isActive = function () {
            return modals.length > 0;
        };

        rrcModal.defaults = {
            closeExisting: true,
            escapeClose: true,
            clickClose: true,
            closeText: 'Close',
            closeClass: '',
            modalClass: 'rrc-modal',
            spinnerHtml: null,
            showSpinner: true,
            showClose: true,
            fadeDuration: null,   // Number of milliseconds the fade animation takes.
            fadeDelay: 1.0        // Point during the overlay's fade-in that the modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
        };
        // Event constants
        rrcModal.BEFORE_BLOCK = 'modal:before-block';
        rrcModal.BLOCK = 'modal:block';
        rrcModal.BEFORE_OPEN = 'modal:before-open';
        rrcModal.OPEN = 'modal:open';
        rrcModal.BEFORE_CLOSE = 'modal:before-close';
        rrcModal.CLOSE = 'modal:close';
        rrcModal.AFTER_CLOSE = 'modal:after-close';
        rrcModal.AJAX_SEND = 'modal:ajax:send';
        rrcModal.AJAX_SUCCESS = 'modal:ajax:success';
        rrcModal.AJAX_FAIL = 'modal:ajax:fail';
        rrcModal.AJAX_COMPLETE = 'modal:ajax:complete';
        //打开
        this.openModal = function(options){
            new rrcModal(options);
        };
        //关闭
        this.closeModal = function(event){
            rrcModal.close(event);
        };
    }]);
});
