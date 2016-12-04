package functions

import (
	"math/rand"
	"time"
)

// RandInt return random integer
func RandInt(min, max int) int {
	rand.Seed(time.Now().Unix())
	return rand.Intn(max-min) + min
}
