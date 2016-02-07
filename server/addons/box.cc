#include <node.h>

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;
using v8::Number;
using v8::Array;
using v8::Exception;

void Method(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  // Check the number of arguments passed.
  if (args.Length() < 3) {
    // Throw an Error that is passed back to JavaScript
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Wrong number of arguments")));
    return;
  }

  double length = args[0]->NumberValue();
  double width = args[1]->NumberValue();
  double height = args[2]->NumberValue();


  int32_t m = 8; // 8 vertices

  Local<Array> rows = Array::New(isolate, m);

  Local<Object> obj1 = Object::New(isolate);
  obj1->Set(String::NewFromUtf8(isolate, "x"), Number::New(isolate, -width/2));
  obj1->Set(String::NewFromUtf8(isolate, "y"), Number::New(isolate, -length/2));
  obj1->Set(String::NewFromUtf8(isolate, "z"), Number::New(isolate, 0));
  rows->Set(0, obj1);

  Local<Object> obj2 = Object::New(isolate);
  obj2->Set(String::NewFromUtf8(isolate, "x"), Number::New(isolate, -width/2));
  obj2->Set(String::NewFromUtf8(isolate, "y"), Number::New(isolate, length/2));
  obj2->Set(String::NewFromUtf8(isolate, "z"), Number::New(isolate, 0));
  rows->Set(1, obj2);

  Local<Object> obj3 = Object::New(isolate);
  obj3->Set(String::NewFromUtf8(isolate, "x"), Number::New(isolate, -width/2));
  obj3->Set(String::NewFromUtf8(isolate, "y"), Number::New(isolate, -length/2));
  obj3->Set(String::NewFromUtf8(isolate, "z"), Number::New(isolate, height));
  rows->Set(2, obj3);

  Local<Object> obj4 = Object::New(isolate);
  obj4->Set(String::NewFromUtf8(isolate, "x"), Number::New(isolate, -width/2));
  obj4->Set(String::NewFromUtf8(isolate, "y"), Number::New(isolate, length/2));
  obj4->Set(String::NewFromUtf8(isolate, "z"), Number::New(isolate, height));
  rows->Set(3, obj4);

  Local<Object> obj5 = Object::New(isolate);
  obj5->Set(String::NewFromUtf8(isolate, "x"), Number::New(isolate, width/2));
  obj5->Set(String::NewFromUtf8(isolate, "y"), Number::New(isolate, -length/2));
  obj5->Set(String::NewFromUtf8(isolate, "z"), Number::New(isolate, 0));
  rows->Set(4, obj5);

  Local<Object> obj6 = Object::New(isolate);
  obj6->Set(String::NewFromUtf8(isolate, "x"), Number::New(isolate, width/2));
  obj6->Set(String::NewFromUtf8(isolate, "y"), Number::New(isolate, -length/2));
  obj6->Set(String::NewFromUtf8(isolate, "z"), Number::New(isolate, height));
  rows->Set(5, obj6);

  Local<Object> obj7 = Object::New(isolate);
  obj7->Set(String::NewFromUtf8(isolate, "x"), Number::New(isolate, width/2));
  obj7->Set(String::NewFromUtf8(isolate, "y"), Number::New(isolate, length/2));
  obj7->Set(String::NewFromUtf8(isolate, "z"), Number::New(isolate, 0));
  rows->Set(6, obj7);


  Local<Object> obj8 = Object::New(isolate);
  obj8->Set(String::NewFromUtf8(isolate, "x"), Number::New(isolate, width/2));
  obj8->Set(String::NewFromUtf8(isolate, "y"), Number::New(isolate, length/2));
  obj8->Set(String::NewFromUtf8(isolate, "z"), Number::New(isolate, height));
  rows->Set(7, obj8);

  // trianglesM = 12
  // trianglesN = 3
  // There are 3 points in one triangle.
  // P.S. Every point is a vector from rows array below
  int32_t tM = 12;
  int32_t tN = 3;

  int triangles[12][3] =
  {
    { 0, 6, 1 },
    { 0, 4, 6 },
    { 2, 7, 3 },
    { 2, 5, 7 },
    { 0, 3, 2 },
    { 0, 1, 3 },
    { 1, 3, 7 },
    { 1, 7, 6 },
    { 6, 7, 5 },
    { 6, 5, 4 },
    { 4, 5, 2 },
    { 4, 2, 0 },
  };

  Local<Array> triangulations = Array::New(isolate, tM);
  for(int i = 0; i < tM; i++) {
    Local<Array> tRow = Array::New(isolate, tN);
    triangulations->Set(i, tRow);

    for(int j = 0; j < tN; j++) {
        tRow->Set(j, rows->Get(triangles[i][j]));
    }
  }

  args.GetReturnValue().Set(triangulations);
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "triangulate", Method);
}

NODE_MODULE(addon, init)
