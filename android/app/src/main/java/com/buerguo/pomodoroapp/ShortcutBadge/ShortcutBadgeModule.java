package com.buerguo.pomodoroapp.ShortcutBadge;

import android.content.Context;
import android.content.Intent;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import me.leolin.shortcutbadger.ShortcutBadger;

public class ShortcutBadgeModule extends ReactContextBaseJavaModule {

    private Context context;

    public ShortcutBadgeModule(ReactApplicationContext reactContext) {
        super(reactContext);

        this.context = (Context) reactContext;
    }

    @Override
    public String getName() {
        return "ShortcutBadgeAndroid";
    }

    @ReactMethod
    public void setBadgeCount(int count, Callback completionCallback) {
        if (ShortcutBadger.isBadgeCounterSupported(context)) {
            ShortcutBadger.applyCount(context, count);
        } else {
            context.startService(new Intent(context, BadgeIntentService.class).putExtra("badgeCount", count));
        }
    }
}