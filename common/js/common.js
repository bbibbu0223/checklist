// 체크박스 상태 저장
function saveCheckboxState() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkboxStates = {};
    checkboxes.forEach((checkbox, index) => {
        checkboxStates[index] = checkbox.checked;
    });
    localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
}

// 체크박스 상태 불러오기
function loadCheckboxState() {
    const checkboxStates = JSON.parse(localStorage.getItem('checkboxStates')) || {};
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = checkboxStates[index] || false;
        toggleHighlight(checkbox);
    });
}

// 체크상태 li 바탕 색상 변경
function toggleHighlight(checkbox) {
    const Div = checkbox.closest('.arcBox');
    if (checkbox.checked) {
        Div.classList.add('highlight');
    } else {
        Div.classList.remove('highlight');
    }
}

// 초기화 버튼 클릭 시 모든 체크박스 해제 및 상태 저장
function resetCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        toggleHighlight(checkbox);

    });
    localStorage.removeItem('checkboxStates');
}

// 페이지 로드 시 체크박스 상태 불러오기
window.onload = function () {
    loadCheckboxState();
}

// 모든 체크박스에 클릭 이벤트 추가
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            saveCheckboxState();
            toggleHighlight(checkbox);
        });
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            const arcBox = event.target.closest('.arcBox');
            const arcCon = arcBox.querySelector('.arcCon');
            const foldButtonIcon = arcBox.querySelector('.fold');

            // 체크박스 체크 시 콘텐츠 닫기
            if (checkbox.checked) {
                arcCon.classList.remove('show');
                foldButtonIcon.classList.remove('rotate');
            }
            saveCheckboxState();
        });
    });
});

//컨텐츠 열고 닫기
document.addEventListener('DOMContentLoaded', () => {
    const foldButtons = document.querySelectorAll('.fold');
    const Handle = document.querySelectorAll('.handle');

    foldButtons.forEach(button => {
        button.addEventListener('click', () => {
            const arcCon = button.parentElement.nextElementSibling;
            arcCon.classList.toggle('show');
            button.classList.toggle('rotate');
        })
    })

    Handle.forEach(button => {
        button.addEventListener('click', (event) => {
            const arcBox = event.target.closest('.arcBox');
            const arcCon = arcBox.querySelector('.arcCon');
            const foldBtnIcon = arcBox.querySelector('.fold');

            arcCon.classList.toggle('show');
            foldBtnIcon.classList.toggle('rotate');
        })
    })
})

//초기화 시 얼럿
document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.getElementById('resetButton');

    resetButton.addEventListener('click', () => {
        const confirmed = confirm('모든 내용을 초기화하시겠습니까?');

        if (confirmed) {
            resetCheckboxes();
            localStorage.clear();
            document.querySelectorAll('.memoCon').forEach(textarea => {
                textarea.value = '';
            });
        }
    });
});

// innerTab 동작
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.arcCon').forEach(function (container) {
        container.querySelectorAll('.tab-a').forEach(function (tab) {
            tab.addEventListener('click', handleTabClick);
        });
    });

    function handleTabClick(event) {
        event.preventDefault();
        var dataId = this.getAttribute('data-id');
        var container = this.closest('.arcCon');
        var currentActiveTab = container.querySelector('.tab.tab-active');
        var currentActiveTabA = container.querySelector('.tab-a.active-a');

        if (currentActiveTab &&
            currentActiveTab.dataset.id === dataId) {
            return;
        }
        if (currentActiveTab) {
            currentActiveTab.classList.remove('tab-active');
        }

        var newActiveTab = container.querySelector('.tab[data-id="' + dataId + '"]');
        if (newActiveTab) {
            newActiveTab.classList.add('tab-active');
        }
        if (currentActiveTabA) {
            currentActiveTabA.classList.remove('active-a');
        }
        this.closest('ul').querySelectorAll('.active-a').forEach(function (item) {
            item.classList.remove('active-a');
        });
        this.parentElement.classList.add('active-a');
    }
});

//memo 열고 닫기
document.addEventListener('DOMContentLoaded', () => {
    const memeoButton = document.querySelectorAll('.memoBtn');

    memeoButton.forEach(button => {
        button.addEventListener('click', () => {
            const memoAreas = document.querySelectorAll('.memo');
            const conAreas = document.querySelectorAll('.conBox');

            memoAreas.forEach(memoArea => {
                memoArea.classList.toggle('active');
            });
            conAreas.forEach(conArea => {
                conArea.classList.toggle('active');
            });

            memeoButton.forEach(btn => {
                if (btn === button) {
                    btn.classList.toggle('click');
                } else {
                    btn.classList.remove('click');
                }
            })
        });
    });
})

//가이드 서브 버튼
// document.addEventListener('DOMContentLoaded', () => {
//     const DialBtn = document.querySelectorAll('.dialBtn');

//     DialBtn.forEach(button => {
//         button.addEventListener('click', () => {
//             const posco = document.querySelectorAll('.subBtn1');
//             const mes = document.querySelectorAll('.subBtn2');

//             posco.forEach(posco => {
//                 posco.classList.toggle('activeBtn');
//             });
//             mes.forEach(mes => {
//                 mes.classList.toggle('activeBtn');
//             });
//         });
//     });
// })

//메모장 height resize
function autoHeight(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}

//테마
document.addEventListener('DOMContentLoaded', () => {
    let themeValue = 'basic';
    const themeButton = document.querySelector('.theme');
    themeButton.addEventListener('click', () => {
        themeValue = themeValue === 'basic' ? 'dark' : 'basic';
        setTheme(themeValue);
    });
    const setTheme = (theme) => {
        document.documentElement.className = theme;
    };
    setTheme(themeValue);
});

//전체 접기
document.addEventListener('DOMContentLoaded', function () {
    const foldAllButton = document.querySelector('.foldAll');
    if (foldAllButton) {
        foldAllButton.addEventListener('click', function () {
            document.querySelectorAll('.arcCon').forEach(function (arc) {
                arc.classList.remove('show');
            })
            document.querySelectorAll('.fold').forEach(function (btn) {
                btn.classList.remove('rotate');
            })
        })
    }
});

//메모추가
document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('add') || event.target.closest('.add')) {
            addMemo(event.target.closest('.memoBoard'));
        } else if (event.target.classList.contains('del') || event.target.closest('.del')) {
            delMemo(event.target.closest('.memoBoard'));
        }
    });

    function addMemo(memoBoard) {
        const newMemo = document.createElement('div');
        newMemo.classList.add('memoBoard');
        newMemo.innerHTML = `
        <textarea class="memoCon" placeholder="메모를 입력해주세요." oninput="autoHeight(this)"></textarea>
        <div class="memoHead">
        <button class="del" title="메모삭제"><i class="fa-solid fa-xmark"></i></button>
        </div>
        `;
        memoBoard.parentNode.insertBefore(newMemo, memoBoard.nextSibling);
    }

    const saveAddcon = localStorage.getItem(`newMemo${index}`);
    if (saveAddcon) {
        newMemo = saveAddcon;
        0
    }

    function delMemo(memoBoard) {
        memoBoard.remove();
    }
});

//메모 내용 저장 및 삭제
document.addEventListener('DOMContentLoaded', () => {
    const memoBoards = document.querySelectorAll('.memoBoard');
    let memoIdCounter = 0;

    const loadMemoContent = () => {
        memoBoards.forEach((board, index) => {
            const textarea = board.querySelector('.memoCon');
            const savedContent = localStorage.getItem(`memoContent-${index}`);
            if (savedContent) {
                textarea.value = savedContent;
            }
        });
    };
    const saveMemoContent = () => {
        memoBoards.forEach((board, index) => {
            const textarea = board.querySelector('.memoCon');
            localStorage.setItem(`memoContent-${index}`, textarea.value);
        });
    };

    const addMemo = () => {
        const newMemo = document.createElement('div');
        newMemo.classList.add('memoBoard');
        newMemo.innerHTML = `
    <textarea class="memoCon" placeholder="메모를 입력해주세요."></textarea>
    <div class="memoHead">
    <button class="del" title="메모삭제"><i class="fa-solid fa-xmark"></i></button>
    <button class="add" title="메모추가"><i class="fa-solid fa-circle-plus"></i></button>
    </div>
            `;
        document.body.appendChild(newMemo);
        memoIdCounter++;
        attachMemoListeners(newMemo);
    };

    const attachMemoListeners = (memo) => {
        const textarea = memo.querySelector('.memoCon');
        const addButton = memo.querySelector('.add');
        const delButton = memo.querySelector('.del');

        textarea.addEventListener('input', saveMemoContent);

        addButton.addEventListener('click', addMemo);

        delButton.addEventListener('click', () => {
            memo.remove();
            saveMemoContent();
        });
    };
    loadMemoContent();

    memoBoards.forEach(memo => attachMemoListeners(memo));
});

document.addEventListener('DOMContentLoaded', () => {
    const memoContainer = document.getElementById('memoContainer');

    // 메모 내용과 구조를 로드
    const loadMemos = () => {
        const savedMemos = JSON.parse(localStorage.getItem('memos')) || [];
        memoContainer.innerHTML = ''; // 기존 메모 지우기
        savedMemos.forEach(memoData => {
            addMemo(memoData.content);
        });
    };

    // 메모 내용과 구조를 저장
    const saveMemos = () => {
        const memos = document.querySelectorAll('.memoBoard');
        const memoDataArray = [];
        memos.forEach(memo => {
            const textarea = memo.querySelector('.memoCon');
            memoDataArray.push({ content: textarea.value });
        });
        localStorage.setItem('memos', JSON.stringify(memoDataArray));
    };

    // 메모 추가
    const addMemo = (content = '') => {
        const newMemo = document.createElement('div');
        newMemo.classList.add('memoBoard');
        newMemo.innerHTML = `
            <textarea class="memoCon" placeholder="메모를 입력해주세요." oninput="autoHeight(this)">${content}</textarea>
            <div class="memoHead">
                <button class="del" title="메모삭제"><i class="fa-solid fa-xmark"></i></button>
                <button class="add" title="메모추가"><i class="fa-solid fa-circle-plus"></i></button>
            </div>
        `;
        memoContainer.appendChild(newMemo);
        attachMemoListeners(newMemo);
        saveMemos();
    };

    // 메모 리스너 추가
    const attachMemoListeners = (memo) => {
        const textarea = memo.querySelector('.memoCon');
        const addButton = memo.querySelector('.add');
        const delButton = memo.querySelector('.del');

        textarea.addEventListener('input', saveMemos);

        addButton.addEventListener('click', () => addMemo());

        delButton.addEventListener('click', () => {
            memo.remove();
            saveMemos();
        });
    };

    // 초기화 버튼
    document.getElementById('resetButton').addEventListener('click', () => {
        const confirmed = confirm('모든 내용을 초기화하시겠습니까?');
        if (confirmed) {
            localStorage.removeItem('memos');
            document.querySelectorAll('.memoBoard').forEach(memoBoard => {
                memoBoard.remove();
            });
            saveMemos();
        }
    });

    loadMemos();

    // 초기 메모 추가 버튼 이벤트 리스너
    document.getElementById('addMemoButton').addEventListener('click', () => addMemo());
});

// 메모장 height resize
function autoHeight(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}


