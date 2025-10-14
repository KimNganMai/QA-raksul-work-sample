## Automation:

### Project Structure:
- `tests\module1\example.spec.ts` - Scenarios for Module1.
- `tests\module1\example.json` - Configuration for Module1 scenarios.
- `src\POMs\form.ts` - Functions related to forms.
- `playwright.config.ts` - Playwright project configuration.
- `test-results` - Directory to save report files from the last test run, including integrated trace reports.

### Running the Project
To clone and run the project locally:

#### Clone the repository:

```
git clone https://github.com/KimNganMai/QA-raksul-work-sample.git
cd QA-raksul-work-sample
```

#### Install dependencies:

```
npm install
```

#### Run the test cases:

```
npm test
```

Make sure Node.js and npm are installed on your machine before proceeding. Adjust configurations or use additional options as needed based on the project setup.

## Ref doc:
- https://docs.google.com/document/d/1cgy3GiBPoU7S0tf5wlBQAjSxUSoODFS5fdwlLkP4cBM/edit?tab=t.0

## Buổi 1: Git
Các bước thường dùng:
```
// clone repo
git clone <link repo>

// tạo branch mới
git checkout -b <new-branch-name>
// lưu ý: toàn bộ code của branch mới sẽ lấy từ branch local đang đứng

// kiểm tra status của modified files
git status

// add các modified files:
git add .

// commit change
git commit -m “<commit message>”

// push code lần đầu do chưa tạo remote branch trên repo gốc
//To push the current branch and set the remote as upstream
git push --set-upstream origin <new-branch-name>
```
Lúc này, terminal sẽ trả về link sau content
"Create a pull request for '<new-branch-name>' on GitHub by visiting:"
Click vào link để tự động đến trang Open a pull request và thực hiện tạo PR.

Các lệnh khác:
```
// push từ lần thứ 2 trở đi:
// push vào remote branch của branch local đang đứng
git push

// push trực tiếp vào một remote branch khác:
git push origin <tên target branch>

// pull code mới nhất từ remote branch của branch local đang đứng
git pull

// pull code từ branch khác
git pull origin <tên branch remote>

// bỏ hết thay đổi local và quay lại commit gần nhất (chưa commit)
git restore .
// hoặc
git checkout -- .

// đã commit nhưng chưa push
git revert HEAD
// -> Git sẽ tạo một commit mới đảo ngược thay đổi của commit gần nhất.
// -> lịch sử commit vẫn giữ nguyên

// xóa commit gần nhất hoàn toàn (nếu chưa push)
git reset --hard HEAD
// -> code quay lại đúng commit trước đó như chưa từng commit nhầm.

// đã push
git revert HEAD
git push
// -> tạo commit mới đảo ngược commit sai, không làm hỏng lịch sử của repo.
```
