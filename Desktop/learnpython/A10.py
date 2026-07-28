# remoove the last digit of the number ex 2334 result=233
x=int(input("enter the number:"))
x=x//10
print("remoove the number is ",x)
# question 2 
# get the last digit of the number ex 2334 result=4
y=int(input(" question 3 enter the number:"))
result=y%10
print("last digit is ",result)
# quetion 3 swap data of  two  variables.
print("enter the two numbers")
a,b=int(input()),int(input())
print("before swapping a=",a,"b=",b)
a,b=b,a
print("after swapping a=",a,"b=",b)
#question 4 takes 3 number from user and displays only its first digit.
x=int(input("enter the number:"))
print("first digits is :",x//100)

#question 5 takes 3 number from user and displays only its middle digit.
a=int(input("enter the number:"))
print("middle digits is :",a//10%10)