SET GOARCH=amd64
SET GOOS=linux
go build -o %GOPATH%\src\github.com\notfoolen\todo\todo.elf -v main.go
pause
