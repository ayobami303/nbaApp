package com.nbaapp;

// import com.facebook.react.ReactActivity;
import com.reactnativenavigation.controllers.SplashActivity;
import android.content.Intent;

public class MainActivity extends SplashActivity {

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    
}
