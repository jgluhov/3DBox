#include <node.h>
#include <v8.h>

void Method(const v8::FunctionCallbackInfo<v8::Value>& args) {
  v8::Isolate* isolate = args.GetIsolate();
  v8::HandleScope scope(isolate);
  args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, "Tracing is running"));
}

void init(v8::Local<v8::Object> target) {
  NODE_SET_METHOD(target, "trace", Method);
}

NODE_MODULE(box, init);