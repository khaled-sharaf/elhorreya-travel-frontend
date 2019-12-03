import Vue from 'vue'


Vue.directive('read-more', {
    inserted(el, binding, vNode) {
        const loopGetHtml =  setInterval(() => {
            const $this = $(el);
            const text = $this.html().trim().replace(/ {1, }/g, '');
            let event = binding.arg,
                value = binding.value,
                textBtnRead = value.textBtnRead,
                textBtnUnread = value.textBtnUnread,
                textAfter = value.after,
                btnClassStatic = 'btn-read btn btn-link btn-read-more-inline',
                btn;
            if (text != '') {
                clearInterval(loopGetHtml);
                let len = window.parseInt(value.limit),
                    text = $this.html().trim().replace(/ {1, }/g, ''),
                    newText = text.slice(0, len);
                if ((text.length - len) >= 50) {
                    let contentText = $this.find('span.content-text').first();
                    $this.html('');
                    if (!contentText.length) {
                        contentText = $('<span class="content-text"></span>');
                        $this.prepend(contentText);
                    }
                    if (textAfter) {
                        contentText.html(newText + textAfter);
                        $this.on('click', '.btn-router-link', function(e) {
                          e.preventDefault();
                          let self = $(this),
                              routerName = self.attr('data-name'),
                              routerParams = self.attr('data-params');

                          if (routerName != null && routerParams != null) {
                              routerParams = JSON.parse(routerParams);
                              vNode.context.$router.push({name: routerName, params: routerParams});
                          } else {
                              console.error('Error router link => data-name is required, data-params is required in link attributes');
                          }
                        })
                    } else {
                        if (event) {
                            btn = $this.find('.btn-read').first();
                            if (!btn.length) {
                                let btnHTML = '<button class="' + btnClassStatic + ' has-limit">' + textBtnRead + '</button>';
                                contentText.html(newText + btnHTML);
                            }
                        } else {
                            contentText.html(newText + '...');
                        }
                    }
                }
                $this.on('click', '.btn-read', function () {
                    if (event === 'toggle') {
                        if ($(this).hasClass('has-limit')) {
                            let btnHTML = '<button class="' + btnClassStatic + '">' + textBtnUnread + '</button>';
                            $this.find('.content-text').html(text + btnHTML);
                        } else {
                            let btnHTML = '<button class="' + btnClassStatic + ' has-limit">' + textBtnRead + '</button>';
                            $this.find('.content-text').html(newText + btnHTML);
                        }
                    } else if (event === 'show') {
                        if ($(this).hasClass('has-limit')) {
                            $(this).removeClass('has-limit');
                            $(this).hide();
                            $this.find('.content-text').html(text);
                        }
                    }
                });
            }
        }, 200)
    }
})
