package com.cryptokeno.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.cryptokeno.app.ui.theme.CryptoPurple

@Composable
fun HomeScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF121212))
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(24.dp)
    ) {
        // Header
        Text(
            "CryptoKeno",
            fontSize = 36.sp,
            fontWeight = FontWeight.Bold,
            color = Color.White,
            modifier = Modifier.padding(top = 32.dp)
        )
        
        Text(
            "Real-Time Crypto Gaming",
            fontSize = 16.sp,
            color = Color(0xFFBBBBBB)
        )

        Spacer(modifier = Modifier.height(32.dp))

        // Game Cards
        GameCard(title = "Keno", description = "Classic Keno with crypto rewards")
        GameCard(title = "Live Leaderboard", description = "Real-time player rankings")
        GameCard(title = "Multiplayer", description = "Play with friends worldwide")

        Spacer(modifier = Modifier.height(32.dp))

        // Action Buttons
        Button(
            onClick = { /* Play action */ },
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp),
            colors = ButtonDefaults.buttonColors(containerColor = CryptoPurple),
            shape = RoundedCornerShape(12.dp)
        ) {
            Text("Play Now", fontSize = 18.sp, fontWeight = FontWeight.Bold)
        }

        Button(
            onClick = { /* Wallet action */ },
            modifier = Modifier
                .fillMaxWidth()
                .height(56.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF1F1F1F)),
            shape = RoundedCornerShape(12.dp)
        ) {
            Text("Connect Wallet", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = Color.White)
        }
    }
}

@Composable
fun GameCard(title: String, description: String) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .height(100.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF1F1F1F)),
        shape = RoundedCornerShape(12.dp)
    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            contentAlignment = Alignment.CenterStart
        ) {
            Column {
                Text(title, fontSize = 18.sp, fontWeight = FontWeight.Bold, color = CryptoPurple)
                Text(description, fontSize = 12.sp, color = Color(0xFFBBBBBB))
            }
        }
    }
}
