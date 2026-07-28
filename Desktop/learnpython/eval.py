a=eval(input("enter data "))
print(a,type(a))
 # question 2
x=eval(input("enter the Data:"))
print("Data is ",x,type(x))
match x:
    case x if type(x)==int:
        print("integer")
    case x if type(X)==float:
            print("float")
    case x if type(x)==str:
          print("string")
    case x if type(x)==bool:
            print("boolean")
            
        