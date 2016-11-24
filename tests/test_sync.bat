cd ..
go get
go build main.go
main.exe orm syncdb -force=1 -v
bee run