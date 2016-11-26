package functions

import (
	"crypto/md5"
	"encoding/hex"
	"math/rand"
	"strings"
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

// GenerateRandomString return random string
func GenerateRandomString(length int, lower bool) string {
	stack := "zyxwvutskjhfedcbaABCDEFGHKLMNPQRSTUVWXYZ2345678"
	output := ""
	len := len(stack) - 1
	for i := 0; i < length; i++ {
		pos := rand.Intn(len)
		output += string(stack[pos])
	}

	if lower {
		output = strings.ToLower(output)
	}

	return output
}

// HashPwdSalt return salt and hash of user password
func HashPwdSalt(input string) (pwd string, hash string) {
	salt := GenerateRandomString(12, false)
	hashPwd := HashPwd(input, salt)
	return hashPwd, salt
}
