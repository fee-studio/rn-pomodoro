package com.buerguo.pomodoroapp.ShortcutBadge;

import android.annotation.TargetApi;
import android.app.IntentService;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import com.blankj.utilcode.util.AppUtils;
import com.buerguo.pomodoroapp.R;

import me.leolin.shortcutbadger.ShortcutBadger;

public class BadgeIntentService extends IntentService {

    private static final String NOTIFICATION_CHANNEL = "com.buerguo.pomodoroapp";

    private int notificationId = 1000;

    public BadgeIntentService() {
        super("BadgeIntentService");
    }

    private NotificationManager mNotificationManager;

    @Override
    public void onCreate() {
        super.onCreate();
        mNotificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
    }

    @Override
    public void onStart(Intent intent, int startId) {
        super.onStart(intent, startId);
    }

    @Override
    protected void onHandleIntent(Intent intent) {
        if (intent != null) {
            int badgeCount = intent.getIntExtra("badgeCount", 0);

            mNotificationManager.cancel(notificationId);

            Notification.Builder builder = new Notification.Builder(getApplicationContext())
                    .setContentTitle(AppUtils.getAppName())
                    .setContentText(badgeCount > 0
                            ? "您今日还有" + badgeCount + "项待办任务哦，加油！"
                            : "早晚检查今日待办列表是一个很好的习惯哦。")
                    .setSmallIcon(R.mipmap.ic_launcher);

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                setupNotificationChannel();

                builder.setChannelId(NOTIFICATION_CHANNEL);
            }

            Notification notification = builder.build();
            ShortcutBadger.applyNotification(getApplicationContext(), notification, badgeCount);
            mNotificationManager.notify(notificationId, notification);
        }
    }

    @TargetApi(Build.VERSION_CODES.O)
    private void setupNotificationChannel() {
        NotificationChannel channel = new NotificationChannel(NOTIFICATION_CHANNEL, "ShortcutBadger Sample",
                NotificationManager.IMPORTANCE_DEFAULT);

        mNotificationManager.createNotificationChannel(channel);
    }
}
