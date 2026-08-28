# Firebase
-keepattributes *Annotation*
-keepattributes SourceFile,LineNumberTable
-keep public class * extends java.lang.Exception
-keep class com.google.firebase.** { *; }

# Kotlin Serialization
-keepattributes *Annotation*
-keep class kotlinx.serialization.** { *; }
-keepclassmembers class * {
    *** Companion;
}

# Ktor
-keep class io.ktor.** { *; }

# Koin
-keep class org.koin.** { *; }
-keepclasseswithmembernames class * {
    *** _creator(...);
}
