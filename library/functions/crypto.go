package functions

import (
	"crypto/md5"
	"encoding/hex"
	"math/rand"
)

// HashPwd make hash string of user password
func HashPwd(input, salt string) string {
	return GetHash(salt + input + salt)
}

// GetHash get hash string of text
func GetHash(text string) string {
	hasher := md5.New()
	hasher.Write([]byte(text))
	return hex.EncodeToString(hasher.Sum(nil))
}

// GetSalt return salt string
func GetSalt(length int) string {
	passCase := "zyxwvutskjhfedcbaABCDEFGHKLMNPQRSTUVWXYZ2345678"
	pwd := ""
	len := len(passCase) - 1
	for i := 0; i < length; i++ {
		pos := rand.Intn(len)
		pwd = pwd + string(passCase[pos])
	}

	return pwd
}

// HashPwdSalt return salt and hash of user password
func HashPwdSalt(input string) (pwd string, hash string) {
	salt := GetSalt(12)
	hashPwd := HashPwd(input, salt)
	return hashPwd, salt
}
