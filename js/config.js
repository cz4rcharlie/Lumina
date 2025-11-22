// Tailwind CSS 配置
tailwind.config = {
    theme: {
        extend: {
            colors: {
                void: '#050511',     // 虚空黑
                gold: '#D4AF37',     // 复古金
                lavender: '#E6E6FA', // 薰衣草雾
                nebula: '#2D1B4E',   // 星云紫
            },
            fontFamily: {
                serif: ['"Noto Serif SC"', 'serif'],
                sans: ['"Inter"', 'sans-serif'],
            },
            animation: {
                'breathe': 'breathe 4s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'spin-slow': 'spin 12s linear infinite',
                'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
                'shimmer': 'shimmer 2s ease-in-out infinite',
                'particle-float': 'particle-float 8s ease-in-out infinite',
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
                }
            }
        }
    }
}

