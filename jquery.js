/************
Newsletter subscribe widget
Looks for div class "newsletter-subscribe-(full|medium|sidebar|social)-widget"
************/

var subscriber_post = 'https://club.komando.com/newsletters/subscribe.json?lists=alerts,kimsnewsletter,kimsdailynews,kimstipoftheday,kimsinsider';
var manage_subscriptions = 'https://club.komando.com/newsletters/subscribe';
var faq_link = '//www.komando.com/faqs';
var auto_popup = false;

function newsletter_subscribe() {

	jQuery(document).ready(function(jQuery) {

		jQuery('body').append('<div class="modal subscribe-modal newsletter-subscribe-modal"><div class="modal-window"><h2>Subscribe to Kim\'s Free Newsletters</h2><div class="modal-close"><span class="fa-stack"><i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-times fa-stack-1x fa-inverse"></i></span></div><div class="modal-body-kim hide-mobile"><img src="//static-assets-prod01.komando.com/v2/201702150800/front/img/logo-kim.png" /></div><div class="modal-body">Get alerts, helpful tips, must-see videos, breaking news, my USA Today column and more - straight to your inbox!<div class="input-append newsletter-subscribe-form"><form class="newsletter-subscribe-form"><input class="newsletter-subscribe-email" type="text" placeholder="Enter your email..."><button type="submit" class="subscribe-ad-button"><i class="fa fa-angle-right fa-lg"></i></button></form></div><div class="newsletter-subscribe-spinner"><img src="//static-assets-prod01.komando.com/v2/201702150800/front/img/mini-spinner.gif" alt="Loading" title="Loading" /></div><div class="newsletter-subscribe-response"></div></div></div></div>');

		jQuery('.newsletter-subscribe-form').submit(function(e) {
			e.preventDefault();

			var form = jQuery(this);
			var email = form.parent().parent().find('.newsletter-subscribe-email').val();
			if( '' != email ) {
				form.parent().parent().find('.newsletter-subscribe-form').hide();
				form.parent().parent().find('.newsletter-subscribe-spinner').show();

				jQuery.ajax({
					type: 'POST',
					url: subscriber_post,
					data: {email: email}
				}).done(
					function(code) {
						if(form.hasClass('slim')) {
							if(code.status === 0) {
								form.parent().parent().find('.newsletter-subscribe-response').html('Check your email to confirm.').fadeIn();
							} else if (code.status === 1) {
								form.parent().parent().find('.newsletter-subscribe-response').html('Invalid email, <span class="form-reset"><strong>click here</strong></span> to try again.').fadeIn();
							} else if (code.status === 2) {
								form.parent().parent().find('.newsletter-subscribe-response').html('You\'re already subscribed.').fadeIn();
							} else if (code.status === 3) {
								form.parent().parent().find('.newsletter-subscribe-response').html('Check your email to confirm.').fadeIn();
							}
							jQuery('.newsletter-subscribe-spinner').hide();
						} else {
							if(code.status === 0) {
								form.parent().parent().find('.newsletter-subscribe-response').html('<strong>Congratulations.</strong> Check your inbox for a welcome email and link to manage your newsletter subscription. If you do not see it in your inbox, check your bulk/junk mail folder.').fadeIn();
							} else if (code.status === 1) {
								form.parent().parent().find('.newsletter-subscribe-response').html('Whoops. Your email address is invalid, <span class="form-reset"><strong>click here</strong></span> to try again.').fadeIn();
							} else if (code.status === 2) {
								form.parent().parent().find('.newsletter-subscribe-response').html('You\'re already subscribed to my' +
                                    ' newsletters. If you aren\'t receiving them <span class="manage_subscriptions"><strong>click here</strong></span> to manage your subscriptions.').fadeIn();
							} else if (code.status === 3) {
								form.parent().parent().find('.newsletter-subscribe-response').html('We have sent you a verification email that has a confirmation link. If you do not see it in your inbox, check your bulk/junk mail folder.').fadeIn();
							}
							jQuery('.newsletter-subscribe-spinner').hide();
						}
					}
				);

				// This is for the old version of Google Analytics - dc.js
				if (window._gaq != null) {
					_gaq.push(['_trackEvent', 'Homepage', 'Newsletter Subscribe', 'Subscribed, ' + jQuery('body').data('bucket')]);
				}
				// This is for the newest version of Google Analytics - analytics.js
				if (window.ga != null) {
					ga('send', 'event', 'Homepage', 'Newsletter Subscribe', 'Subscribed, ' + jQuery('body').data('bucket'));
				}

				if (window.ga != null) {
					ga('send','event','newsletter subscribe','click');
				}
			} else {
				// Email is blank
				form.parent().parent().find('.newsletter-subscribe-response').html('Email cannot be blank').fadeIn();
			}

			return false;
		});

		jQuery('.newsletter-subscribe-response').on('click', '.manage_subscriptions', function() {
			window.location = manage_subscriptions;
		});

		jQuery('.newsletter-subscribe-response').on('click', '.form-reset', function() {
			jQuery(this).parent().hide();
			jQuery(this).parent().parent().find('.newsletter-subscribe-form').fadeIn();
			jQuery(this).parent().parent().find('.newsletter-subscribe-email').select();
		});

		if(jQuery.cookie && !jQuery.cookie('k2-home-newsletter-pop') && jQuery('body').hasClass('home') && auto_popup) {

			var poptime = 3;

			var time = 0;
			jQuery('body').data('bucket', '0 - 5 seconds');
			var interval = setInterval(function() {

				if(time === poptime) {
					jQuery('.subscribe-modal').show();
					jQuery.cookie('k2-home-newsletter-pop', Math.round(+new Date()/1000), { expires: 730 });

					// This is for the old version of Google Analytics - dc.js
					if (window._gaq != null) {
						_gaq.push(['_trackEvent', 'Homepage', 'Newsletter Subscribe', 'Show newsletter subscribe popup']);
					}

					// This is for the newest version of Google Analytics - analytics.js
					if (window.ga != null) {
						ga('send', 'event', 'Homepage', 'Newsletter Subscribe', 'Show newsletter subscribe popup');
					}
				}

				if(time > 8 && time < 13) {
					jQuery('body').data('bucket', '6 - 10 seconds');
				}

				if(time > 13) {
					jQuery('body').data('bucket', '11+ seconds');
					clearInterval(interval);
				}

				time++;
			}, 1000);

			jQuery(document).on('click', function(e) {
				var container = jQuery('.modal-window');
				if(jQuery('.modal-close i').is(e.target) || !container.is(e.target) && container.has(e.target).length === 0) {
					jQuery('.modal').hide();
					// This is for the old version of Google Analytics - dc.js
					if (window._gaq != null) {
						_gaq.push(['_trackEvent', 'Homepage', 'Newsletter Subscribe', 'Closed, ' + jQuery('body').data('bucket')]);
					}
					// This is for the newest version of Google Analytics - analytics.js
					if (window.ga != null) {
						ga('send', 'event', 'Homepage', 'Newsletter Subscribe', 'Closed, ' + jQuery('body').data('bucket'));
					}
				};
			});
		}

	});
}
