<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();

            $table->string('product_id')->nullable();
            $table->string('part_number')->nullable();
            $table->string('type')->nullable();
            $table->string('vendor_part_number')->nullable();

            $table->string('name')->nullable();
            $table->mediumText('description')->nullable();

            $table->integer('quantity')->default(1);

            $table->decimal('margin_percent', 15, 2)->default(0);
            $table->decimal('margin', 15, 2)->default(0);

            $table->decimal('discount_percent', 15, 2)->default(0);
            $table->decimal('discount', 15, 2)->default(0);

            $table->decimal('cost_price', 15, 2)->default(0);
            $table->decimal('unit_price', 15, 2)->default(0);

            $table->string('unit')->nullable();
            $table->string('group')->nullable();

            $table->decimal('gross', 15, 2)->default(0);
            $table->decimal('net', 15, 2)->default(0);

//            $table->boolean('is_header')->default(false);
            $table->boolean('is_text')->default(false);


            $table->unsignedBigInteger('quote_id')->nullable();
            $table->foreign('quote_id')->references('id')->on('quotes')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
}
