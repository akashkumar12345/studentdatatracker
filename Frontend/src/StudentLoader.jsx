import React from "react";
import "../src/StudentLoader.css"; // Import the CSS below

export default function StudentLoader() {
    return (
        <div class="tea-loader-backdrop">
            <div class="tea-container">
                <div class="cup">
                    <div class="tea"></div>
                    <div class="steam steam1"></div>
                    <div class="steam steam2"></div>
                    <div class="steam steam3"></div>
                </div>
                <div class="plate"></div>
                <div class="loading-text">
                    Hold On<span class="dots"></span>
                </div>
            </div>
        </div>



    );
}
