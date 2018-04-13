function openNav() {
  jQuery("#myNav").slideDown("1000", function() {})
}

function closeNav() {
  jQuery("#myNav").slideUp("1000", function() {})
}
jQuery(function() {
  jQuery('#header-register').click(function() {
    jQuery('.overlay').slideDown('fast', function() {
      jQuery('.registerOuter').animate({
        'top': '0'
      }, 500)
    })
  });
  jQuery('.closeRegi').click(function() {
    jQuery('.overlay').fadeOut('fast')
  });
  jQuery('#bottom').click(function() {
    jQuery('.overlay').fadeOut('fast')
  });
  jQuery('#register-form').submit(function(e) {
    e.preventDefault();
    var $form = jQuery(this);
    var $result = ".result-field-subscribe";
    $form.find($result).text("");
    var name = jQuery('#s2email').val();
    var userTerms = jQuery('#test1:checked').val();
    if (name == "") {
      console.log("otion 1");
      if (userTerms == "on") {
        $form.find($result).text("あなたのメールアドレスを入力してください").removeClass("text-success").addClass("text-danger");
        return !1
      } else {
        $form.find($result).text("あなたのメールアドレスを入力し、利用規約に同意してください").removeClass("text-success").addClass("text-danger");
        return !1
      }
    } else if (userTerms != "on") {
      console.log("otion 2");
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if (!emailReg.test(name)) {
        $form.find($result).text("有効なメールアドレスを入力し、利用規約に同意してください").removeClass("text-success").addClass("text-danger")
      } else {
        $form.find($result).text("利用規約に同意してください").removeClass("text-success").addClass("text-danger")
      }
      return !1
    } else {
      console.log("otion 3");
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if (!emailReg.test(name)) {
        $form.find($result).text("有効なメールアドレスを入力してください").removeClass("text-success").addClass("text-danger");
        return !1
      }
    }
    jQuery.ajax({
      data: {
        EMAIL: name
      },
      type: 'post',
      url: '//diabetesfrontier.us15.list-manage.com/subscribe/post?u=bbf89b7fb48d2ab31388ba9e2&amp;id=6b8694a1da',
      success: function(result) {
        showThankYouMsg($form)
      },
      error: function(err) {
        console.log(err);
        showThankYouMsg($form)
      }
    });
    return !1
  })
});

function showThankYouMsg($form) {
  $form.trigger("reset");
  jQuery('.overlay').slideDown('fast', function() {
    jQuery('.registerOuter').animate({
      'top': '0'
    }, 500)
  });
  jQuery('.registr').hide();
  jQuery('.latest').hide();
  jQuery('#register-form').hide();
  jQuery('.regiCondition').hide();
  jQuery('.thanks').show();
  jQuery('.confrm').show();
  setTimeout(function() {
    window.location.replace("index.html")
  }, 7000)
}
var s2_script_strings = {
  "ajaxurl": "http:\/\/diabetesfrontier.jp\/wp-admin\/admin-ajax.php",
  "title": "Subscribe to this blog"
};
var pum_vars = {
  "ajaxurl": "http:\/\/diabetesfrontier.jp\/wp-admin\/admin-ajax.php",
  "restapi": "http:\/\/diabetesfrontier.jp\/wp-json\/pum\/v1",
  "rest_nonce": null,
  "default_theme": "303",
  "debug_mode": "",
  "disable_open_tracking": ""
};
var pum_debug_vars = {
  "debug_mode_enabled": "Popup Maker Debug Mode Enabled",
  "debug_started_at": "Debug started at:",
  "debug_more_info": "For more information on how to use this information visit http:\/\/docs.wppopupmaker.com\/?utm_medium=js-debug-info&utm_campaign=ContextualHelp&utm_source=browser-console&utm_content=more-info",
  "global_info": "Global Information",
  "localized_vars": "Localized variables",
  "popups_initializing": "Popups Initializing",
  "popups_initialized": "Popups Initialized",
  "single_popup_label": "Popup: #",
  "theme_id": "Theme ID: ",
  "label_method_call": "Method Call:",
  "label_method_args": "Method Arguments:",
  "label_popup_settings": "Settings",
  "label_triggers": "Triggers",
  "label_cookies": "Cookies",
  "label_delay": "Delay:",
  "label_conditions": "Conditions",
  "label_cookie": "Cookie:",
  "label_settings": "Settings:",
  "label_selector": "Selector:",
  "label_mobile_disabled": "Mobile Disabled:",
  "label_tablet_disabled": "Tablet Disabled:",
  "label_display_settings": "Display Settings:",
  "label_close_settings": "Close Settings:",
  "label_event_before_open": "Event: Before Open",
  "label_event_after_open": "Event: After Open",
  "label_event_open_prevented": "Event: Open Prevented",
  "label_event_setup_close": "Event: Setup Close",
  "label_event_close_prevented": "Event: Close Prevented",
  "label_event_before_close": "Event: Before Close",
  "label_event_after_close": "Event: After Close",
  "label_event_before_reposition": "Event: Before Reposition",
  "label_event_after_reposition": "Event: After Reposition",
  "label_event_checking_condition": "Event: Checking Condition",
  "triggers": {
    "click_open": {
      "name": "Click Open",
      "modal_title": "Click Trigger Settings",
      "settings_column": "<strong>Extra Selectors<\/strong>: {{data.extra_selectors}}"
    },
    "auto_open": {
      "name": "Auto Open",
      "modal_title": "Auto Open Settings",
      "settings_column": "<strong>Delay<\/strong>: {{data.delay}}"
    }
  },
  "cookies": {
    "on_popup_open": {
      "name": "On Popup Open",
      "modal_title": "On Popup Open Settings"
    },
    "on_popup_close": {
      "name": "On Popup Close",
      "modal_title": "On Popup Close Settings"
    },
    "manual": {
      "name": "Manual JavaScript",
      "modal_title": "Click Trigger Settings"
    }
  }
};
var ajaxurl = "index.html\/\/diabetesfrontier.jp\/wp-admin\/admin-ajax.php";
var popmake_default_theme = "303";

function openNav() {
  jQuery("#myNav").slideDown("1000", function() {})
}

function closeNav() {
  jQuery("#myNav").slideUp("1000", function() {})
}
jQuery(function() {
  jQuery('#header-register').click(function() {
    jQuery('.overlay').slideDown('fast', function() {
      jQuery('.registerOuter').animate({
        'top': '0'
      }, 500)
    })
  });
  jQuery('.closeRegi').click(function() {
    jQuery('.overlay').fadeOut('fast')
  });
  jQuery('#bottom').click(function() {
    jQuery('.overlay').fadeOut('fast')
  });
  jQuery('#register-form').submit(function(e) {
    e.preventDefault();
    var $form = jQuery(this);
    var $result = ".result-field-subscribe";
    $form.find($result).text("");
    var name = jQuery('#s2email').val();
    var userTerms = jQuery('#test1:checked').val();
    if (name == "") {
      console.log("otion 1");
      if (userTerms == "on") {
        $form.find($result).text("あなたのメールアドレスを入力してください").removeClass("text-success").addClass("text-danger");
        return !1
      } else {
        $form.find($result).text("あなたのメールアドレスを入力し、利用規約に同意してください").removeClass("text-success").addClass("text-danger");
        return !1
      }
    } else if (userTerms != "on") {
      console.log("otion 2");
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if (!emailReg.test(name)) {
        $form.find($result).text("有効なメールアドレスを入力し、利用規約に同意してください").removeClass("text-success").addClass("text-danger")
      } else {
        $form.find($result).text("利用規約に同意してください").removeClass("text-success").addClass("text-danger")
      }
      return !1
    } else {
      console.log("otion 3");
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if (!emailReg.test(name)) {
        $form.find($result).text("有効なメールアドレスを入力してください").removeClass("text-success").addClass("text-danger");
        return !1
      }
    }
    jQuery.ajax({
      data: {
        EMAIL: name
      },
      type: 'post',
      url: '//diabetesfrontier.us15.list-manage.com/subscribe/post?u=bbf89b7fb48d2ab31388ba9e2&amp;id=6b8694a1da',
      success: function(result) {
        showThankYouMsg($form)
      },
      error: function(err) {
        console.log(err);
        showThankYouMsg($form)
      }
    });
    return !1
  })
});

function showThankYouMsg($form) {
  $form.trigger("reset");
  jQuery('.overlay').slideDown('fast', function() {
    jQuery('.registerOuter').animate({
      'top': '0'
    }, 500)
  });
  jQuery('.registr').hide();
  jQuery('.latest').hide();
  jQuery('#register-form').hide();
  jQuery('.regiCondition').hide();
  jQuery('.thanks').show();
  jQuery('.confrm').show();
  setTimeout(function() {
    window.location.replace("/")
  }, 7000)
}
var pum_vars = {
  "ajaxurl": "",
  "restapi": "",
  "rest_nonce": null,
  "default_theme": "303",
  "debug_mode": "",
  "disable_open_tracking": ""
};
var pum_debug_vars = {
  "debug_mode_enabled": "Popup Maker Debug Mode Enabled",
  "debug_started_at": "Debug started at:",
  "debug_more_info": "For more information on how to use this information visit http:\/\/docs.wppopupmaker.com\/?utm_medium=js-debug-info&utm_campaign=ContextualHelp&utm_source=browser-console&utm_content=more-info",
  "global_info": "Global Information",
  "localized_vars": "Localized variables",
  "popups_initializing": "Popups Initializing",
  "popups_initialized": "Popups Initialized",
  "single_popup_label": "Popup: #",
  "theme_id": "Theme ID: ",
  "label_method_call": "Method Call:",
  "label_method_args": "Method Arguments:",
  "label_popup_settings": "Settings",
  "label_triggers": "Triggers",
  "label_cookies": "Cookies",
  "label_delay": "Delay:",
  "label_conditions": "Conditions",
  "label_cookie": "Cookie:",
  "label_settings": "Settings:",
  "label_selector": "Selector:",
  "label_mobile_disabled": "Mobile Disabled:",
  "label_tablet_disabled": "Tablet Disabled:",
  "label_display_settings": "Display Settings:",
  "label_close_settings": "Close Settings:",
  "label_event_before_open": "Event: Before Open",
  "label_event_after_open": "Event: After Open",
  "label_event_open_prevented": "Event: Open Prevented",
  "label_event_setup_close": "Event: Setup Close",
  "label_event_close_prevented": "Event: Close Prevented",
  "label_event_before_close": "Event: Before Close",
  "label_event_after_close": "Event: After Close",
  "label_event_before_reposition": "Event: Before Reposition",
  "label_event_after_reposition": "Event: After Reposition",
  "label_event_checking_condition": "Event: Checking Condition",
  "triggers": {
    "click_open": {
      "name": "Click Open",
      "modal_title": "Click Trigger Settings",
      "settings_column": "<strong>Extra Selectors<\/strong>: {{data.extra_selectors}}"
    },
    "auto_open": {
      "name": "Auto Open",
      "modal_title": "Auto Open Settings",
      "settings_column": "<strong>Delay<\/strong>: {{data.delay}}"
    }
  },
  "cookies": {
    "on_popup_open": {
      "name": "On Popup Open",
      "modal_title": "On Popup Open Settings"
    },
    "on_popup_close": {
      "name": "On Popup Close",
      "modal_title": "On Popup Close Settings"
    },
    "manual": {
      "name": "Manual JavaScript",
      "modal_title": "Click Trigger Settings"
    }
  }
};
var ajaxurl = "";
var popmake_default_theme = "303"
