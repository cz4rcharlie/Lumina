// Tailwind CSS 配置
tailwind.config = {
    theme: {
        extend: {
            colors: {
                void: '#161025',     // 深蓝紫背景（更深邃神秘）
                gold: '#E5A0C0',     // 柔和玫瑰粉（更温暖治愈）
                lavender: '#F2E1FF', // 温暖薰衣草雾（增强治愈感）
                nebula: '#3A2859',   // 柔和星云紫（平衡神秘）
            },
            fontFamily: {
                serif: ['Noto Serif SC', 'PingFang SC', 'Source Han Serif SC', 'Microsoft YaHei', 'serif'],
                sans: ['Inter', 'SF Pro Text', 'PingFang SC', 'Source Han Sans SC', 'Microsoft YaHei', 'sans-serif'],
            },
            animation: {
                'breathe': 'breathe 4s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'spin-slow': 'spin 12s linear infinite',
                'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
                'shimmer': 'shimmer 2s ease-in-out infinite',
                'particle-float': 'particle-float 8s ease-in-out infinite',
                'gentle-pulse': 'gentle-pulse 3s ease-in-out infinite',
                'soft-glow': 'soft-glow 4s ease-in-out infinite',
                'ripple': 'ripple 0.6s ease-out',
            },
            keyframes: {
                breathe: {
                    '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
                    '50%': { opacity: '1', transform: 'scale(1.1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'glow-pulse': {
                    '0%, 100%': { opacity: '0.3', filter: 'blur(80px)' },
                    '50%': { opacity: '0.6', filter: 'blur(120px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                'particle-float': {
                    '0%, 100%': { transform: 'translateY(0) translateX(0) scale(1)', opacity: '0.3' },
                    '25%': { transform: 'translateY(-20px) translateX(10px) scale(1.2)', opacity: '0.6' },
                    '50%': { transform: 'translateY(-10px) translateX(-15px) scale(0.8)', opacity: '0.4' },
                    '75%': { transform: 'translateY(-30px) translateX(5px) scale(1.1)', opacity: '0.5' },
                },
                'gentle-pulse': {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
                    '50%': { transform: 'scale(1.05)', opacity: '1' },
                },
                'soft-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(229, 160, 192, 0.3)' },
                    '50%': { boxShadow: '0 0 30px rgba(229, 160, 192, 0.5)' },
                },
                'ripple': {
                    '0%': { transform: 'scale(0)', opacity: '1' },
                    '100%': { transform: 'scale(4)', opacity: '0' },
                }
            }
        }
    }
}

