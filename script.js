// 后端API地址 - 连接到本地服务器
const API_BASE_URL = 'http://localhost:3000';

// 从后端加载留言
async function loadMessages() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/messages`);
        const messages = await response.json();
        
        const messagesContainer = document.getElementById('messagesContainer');
        if (messagesContainer) {
            messagesContainer.innerHTML = '';
            
            messages.forEach(msg => {
                const messageCard = document.createElement('div');
                messageCard.className = 'message-card';
                messageCard.innerHTML = `
                    <div class="message-header">
                        <span class="message-author">${msg.name}</span>
                        <span class="message-date">${msg.date}</span>
                    </div>
                    <p class="message-content">${msg.message}</p>
                `;
                messagesContainer.appendChild(messageCard);
            });
        }
    } catch (error) {
        console.error('加载留言失败:', error);
        alert('无法连接到留言服务器，请确保后端正在运行！');
    }
}

// 提交留言到后端
async function submitMessageToServer(name, message) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, message })
        });
        
        const result = await response.json();
        
        if (result.success) {
            await loadMessages(); // 重新加载留言
            return true;
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('提交留言失败:', error);
        alert('留言提交失败，请检查网络连接！');
        return false;
    }
}

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 导航栏滚动效果
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
    });

    // 留言表单处理
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // 阻止表单默认提交（页面刷新）
            
            const nameInput = form.querySelector('input[type="text"]');
            const messageInput = form.querySelector('textarea');
            
            if (nameInput && messageInput) {
                const name = nameInput.value.trim();
                const message = messageInput.value.trim();
                
                if (!name || !message) {
                    alert('请填写姓名和留言内容！');
                    return;
                }
                
                const success = await submitMessageToServer(name, message);
                
                if (success) {
                    alert('感谢您的留言！已成功提交。');
                    form.reset();
                }
            }
        });
    }

    // 滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察所有卡片元素
    document.querySelectorAll('.about-card, .activity-card, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // "探索更多"按钮功能
    const exploreBtn = document.querySelector('.hero .btn-primary');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            document.querySelector('#about').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // 活动详情数据
    const activityDetails = {
        team: {
            icon: '🍲',
            title: '开伙饭',
            date: '2025年',
            content: `
                <p>班级开伙饭是我们国经2503班的一大传统活动，大家一起去饭店品尝美味的铁锅炖，享受美食，增进友谊。</p>
                <h3>活动特色</h3>
                <p>• 铁锅炖美食：热气腾腾的铁锅炖，香气四溢</p>
                <p>• 丰盛菜品：各种配菜应有尽有，营养丰富</p>
                <p>• 围桌而坐：大家围坐在铁锅旁，畅聊学习生活</p>
                <p>• 欢声笑语：气氛温馨融洽，其乐融融</p>
                <h3>活动意义</h3>
                <p>开伙饭不仅让我们品尝到了美味的铁锅炖，更重要的是在聚餐的过程中增进了了解，加深了友谊。大家一起围坐在桌前，分享着彼此的生活和故事，这种温馨的氛围让国经2503班更加像一个温暖的大家庭。每一次开伙饭都是珍贵的美好回忆。</p>
            `
        },
        sports: {
            icon: '🏃',
            title: '运动会',
            date: '2025年',
            content: `
                <p>运动会上，同学们挥洒汗水，展现青春活力，奋勇争先。</p>
                <h3>参与项目</h3>
                <p>• 田径赛：百米冲刺，奋力向前</p>
                <p>• 接力赛：团队协作，传递友谊</p>
                <p>• 跳高跳远：挑战极限，超越自我</p>
                <p>• 拔河比赛：齐心协力，为班争光</p>
                <h3>收获的荣誉</h3>
                <p>同学们在运动会上表现优异，不仅收获了奖杯和荣誉，更重要的是锻炼了意志品质，培养了团队精神，展现了国经2503班积极向上、朝气蓬勃的班级风貌。</p>
            `
        },
        birthday: {
            icon: '🎂',
            title: '生日会',
            date: '2025年',
            content: `
                <p>为同学们举办生日会，一起分享快乐时光和美好祝福。</p>
                <h3>生日会特色</h3>
                <p>• 精美蛋糕：共同品尝，分享甜蜜</p>
                <p>• 温馨祝福：同学们送上生日祝福</p>
                <p>• 生日礼物：精心准备，表达心意</p>
                <p>• 欢乐游戏：集体互动，其乐融融</p>
                <h3>温馨回忆</h3>
                <p>每一次生日会都是温馨美好的回忆，让我们在紧张的学习生活中感受到班级的温暖，增进了同学之间的情谊，也让国经2503班更加团结友爱。</p>
            `
        }
    };

    // 活动详情模态框功能
    const modal = document.getElementById('activityModal');
    const closeBtn = document.querySelector('.modal-close');
    
    // 点击活动卡片打开详情
    document.querySelectorAll('.activity-card').forEach(card => {
        card.addEventListener('click', () => {
            const activityType = card.getAttribute('data-activity');
            const details = activityDetails[activityType];
            
            if (details) {
                document.getElementById('modalIcon').textContent = details.icon;
                document.getElementById('modalTitle').textContent = details.title;
                document.getElementById('modalDate').textContent = details.date;
                document.getElementById('modalBody').innerHTML = details.content;
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // 关闭模态框
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        });
    }
    
    // 点击背景关闭模态框
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // 相册点击放大功能
    document.querySelectorAll('.gallery-slide img').forEach(img => {
        img.addEventListener('click', function() {
            const src = this.src;
            
            // 创建遮罩
            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.95);z-index:99999;display:flex;align-items:center;justify-content:center;';
            
            const enlargedImg = document.createElement('img');
            enlargedImg.src = src;
            enlargedImg.style.cssText = 'max-width:90%;max-height:90vh;object-fit:contain;';
            
            overlay.appendChild(enlargedImg);
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';
            
            overlay.addEventListener('click', () => {
                document.body.removeChild(overlay);
                document.body.style.overflow = '';
            });
        });
    });

    // 为浮动卡片添加动态效果
    document.querySelectorAll('.floating-card').forEach((card, index) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // 页面加载时读取留言
    loadMessages();

    console.log('半亩法塘 - 国经2503班网站已加载完成！');
});